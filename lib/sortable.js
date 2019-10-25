//Dirty hacks........
var sortable = function (el, onUpdate) {
	if(!el)
		return;

	var self = this;
	self.el = el;
	self.target = -1;

	this.handleDragStart = function(e) {
		self.target = e.target.getAttribute('index');
		e.dataTransfer.effectAllowed = 'move';
		e.dataTransfer.setData('text/html', this.innerHTML);
		this.classList.add('moving');
	};

	this.handleDragOver = function(e) {
		e.preventDefault();
		e.dataTransfer.dropEffect = 'move';
	};

	this.handleDragEnter = function(e) {
		this.classList.add('over');
		return false;
	};

	this.handleDragLeave = function(e) {
		this.classList.remove('over');
		e.preventDefault();
	};

	this.handleDrop = function(e) {
		onUpdate(e.target.getAttribute('index'), self.target);
		this.classList.remove('over');
		e.preventDefault();
	};
	
	this.handleDragEnd = function(e) {
		e.target.classList.remove('over', 'moving');
		el.classList.remove('over', 'moving');
		e.preventDefault();
	};

	el.setAttribute('draggable', 'true');
	el.addEventListener('dragstart', self.handleDragStart, false);
	el.addEventListener('dragenter', self.handleDragEnter, false);
	el.addEventListener('dragover', self.handleDragOver, false);
	el.addEventListener('dragleave', self.handleDragLeave, false);
	el.addEventListener('drop', self.handleDrop, false);
	el.addEventListener('dragend', self.handleDragEnd, false);

	return this;
}