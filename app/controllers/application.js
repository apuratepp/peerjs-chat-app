export default Ember.Controller.extend({
	peer: function(){
		return new Peer({key: '94xgdfr5beyzxgvi', debug: 0});
	}.property(),
	conn: undefined,	

	myPeerId: null,
	otherPeerId: null,

	init: function(){
		var controller = this;
		var peer = this.get('peer');

		peer.on('open', function(id){
			controller.set('myPeerId', id);
		});

		peer.on('connection', function(conn) {
			controller.set('conn', conn);

			controller.get('conn').on('data', function(data){
				controller.showMessage(data, controller.get('conn').peer);
			});

			controller.showMessage('Got dataConnection from [' + controller.get('conn').peer + ']');
		});
	},	

	showMessage: function(message, peer_id){
		if(peer_id){
			$('ul#messages').prepend('<li class="list-group-item"><code>' + peer_id + '</code> ' +  message + '</li>');
		}else{
			$('ul#messages').prepend('<li class="list-group-item">' + message + '</li>');
		}
	},

	actions: {
		connectTo: function(){
			var controller = this;

			var peer = this.get('peer');
			var conn = peer.connect(this.get('otherPeerId'));
			this.set('conn', conn);
						
			this.get('conn').on('data', function(data){
				controller.showMessage(data, controller.get('conn').peer);
			});
			
			this.showMessage( "Connected to [" + this.get('conn').peer + "]");
		},
		send: function(){
			var message = this.get('message');

			this.get('conn').send( message );
			this.showMessage( message, this.myPeerId );
			this.set('message', '');
		}
	}
});	
