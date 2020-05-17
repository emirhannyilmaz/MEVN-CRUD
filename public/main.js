new Vue({
	el: '#app',
	data: {
		users: [],
		id: null,
		username: null,
		email: null,
		age: null,
		isUpdating: false
	},
	methods: {
		del: function(id) {
			axios.delete('http://localhost:8080/delete/' + id);
		},
		edit: function(id, username, email, age) {
			this.id = id;
			this.username = username;
			this.email = email;
			this.age = age;
			this.isUpdating = true;
		},
		update: function() {
			axios.put('http://localhost:8080/update/' + this.id, {
				username: this.username,
				email: this.email,
				age: this.age
			});
		},
		cancel: function() {
			this.id = null;
			this.username = null;
			this.email = null;
			this.age = null;
			this.isUpdating = false;
		},
		create: function() {
			axios.post('http://localhost:8080/create', {
				username: this.username,
				email: this.email,
				age: this.age
			});
		}
	},
	mounted () {
	    axios.get('http://localhost:8080/list').then(response => (
	    		this.users = response.data
	    	)
	    );
  	}
})