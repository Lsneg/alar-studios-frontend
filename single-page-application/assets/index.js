!(() => {
  const RootModel = Backbone.Model.extend({
    defaults: {
      newName: "",
      newPhoneNumber: "",
      data: []
    },
  });

  const RootView = Backbone.View.extend({
    events: {
      "click .disabledInputs": "disabledInputs",
      "click .addInputs": "addInputs",
      "click .remove": "removeInputs",
      "focusout .newPhoneNumber": "newPhoneNumber",
      "focusout .newName": "newName",
    },

    initialize: function() {
      const viewRoot = document.getElementById('viewRoot').innerHTML;
      this.template = _.template(viewRoot)
      this.listenTo(this.model, "change", this.render);
      this.getUser();
      this.render();
    },

    validate: function(value, type) {
      if(type === "phone") {
        const phone = /^[+]?\d+$/;
        if(phone.test(value)) {
          return true;
        }
      }

      if(type === "phone") {
        alert("Некоректный номер телефона")
      }

      if(type === "name") {
        if(value.length !== 0) {
          return true;
        }
      }

      if(type === "name") {
        alert("Некорекное имя пользоавтеля")
      }

      return false;
    },

    getUser: function() {
      const that = this;
      const userList = new Backbone.Collection;
      userList.url = '/api/v1/users';
      userList.fetch().done(function(res) {
        that.model.set("data", res.data)
      });
    },

    render: function() {
        const json = this.model.toJSON();
        const view = this.template(json);
        this.$el.html(view);
    },

    deapClone: function(jsonObject) {
      return JSON.parse(JSON.stringify(jsonObject));
    },

    updateByIndex: function(index, inputName, value) {
      dataModel = this.deapClone(this.model.get("data"));
      dataModel[index][inputName] = value;

      this.model.set("data", dataModel)
    },

    disabledInputs: function(event) {
      const target = event.target;
      const parentNode = target.parentNode;
      const uid = parentNode.id.replace("id-", "");

      const index = this.model.toJSON().data.findIndex(x => x.uid == uid);

      if(this.model.toJSON().data[index].disabled === "disabled") {
        this.updateByIndex(index, "disabled", "")
      } else {
        this.editInputs(event)
      }
    },

    uid: function() {
      return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
        + Math.random().toString(16).slice(2)
        + Date.now().toString(16).slice(4);
    },

    patchChanges: function(uid, data) {
      const userList = new Backbone.Collection;
      userList.url = '/api/v1/users/' + uid;
      return userList.fetch({
        type: 'PATCH',
        contentType: 'application/json',
        data: JSON.stringify(data)
      });
    },

    editInputs: function(event) {
      const target = event.target;
      const parentNode = target.parentNode;
      const id = parentNode.id;
      const getPerentId = document.querySelector(`#${id}`)
      const phoneNumber = getPerentId.querySelector('.phoneNumber').value
      const name = getPerentId.querySelector('.name').value
      const uid = String(parentNode.id.replace("id-", ""));
      const that = this;

      const data = {
        uid: uid,
        name: name,
        phoneNumber: phoneNumber,
        disabled: '',
      };

      if(this.validate(name, "name") && this.validate(phoneNumber, "phone")) {
        this.patchChanges(uid, data).done(function (res) {
          that.model.set("data", res.data);
          this.updateByIndex(index, "disabled", "disabled")
        })
      }
    },

    deleteChanges: function(uid, data) {
      const userList = new Backbone.Collection;
      userList.url = '/api/v1/users/' + uid;
      return userList.fetch({
        type: 'DELETE',
        contentType: 'application/json',
      });
    },

    removeInputs: function(event) {
      const target = event.target;
      const parentNode = target.parentNode;
      const id = parentNode.id;
      const uid = String(parentNode.id.replace("id-", ""));
      const that = this;

      this.deleteChanges(uid).done(function (res) {
        that.model.set("data", res.data);
      })
    },

    postChanges: function(data) {
      const userList = new Backbone.Collection;
      userList.url = '/api/v1/users';
      return userList.fetch({
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(data)
      });
    },

    addInputs: function(event) {
      const newName = document.querySelector('.newName')
      const newPhoneNumber = document.querySelector('.newPhoneNumber')
      const that = this;

      if(this.validate(newName.value, "name") && this.validate(newPhoneNumber.value, "phone")) {
        this.postChanges({
          uid: this.uid(),
          name: newName.value,
          phoneNumber: newPhoneNumber.value,
          disabled: 'disabled',
        }).done(function (res) {
          that.model.set("data", res.data);
        })

        this.model.set("newName", "");
        this.model.set("newPhoneNumber", "");
      }
    },
  });

  const model1 = new RootModel();
  const view = new RootView({
    model: model1,
    el: '#root'
  });
})()
