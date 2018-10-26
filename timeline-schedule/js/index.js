  // DOM element where the Timeline will be attached
  
  const container = document.getElementById('mytimeline');
  // Create a DataSet (allows two way data-binding)
  const numberOfItems = 0;
  const items = new vis.DataSet();
  const types = ['range'];
  
  for (let order = 1; order < numberOfItems; order++ ){
    let date = vis.moment();

	  date.add(Math.round(Math.random() * 2), 'hour');
	  items.add({
	  id: order,
	  type: types[Math.floor(3*Math.random())],
	  content: 'Shift ' + order,
	  start: date.clone().add(order + 1, 'hour'),
	  end: date.clone().add(order +3, 'hour')
	  });
	  };

  // Configuration for the Timeline
  const options = {
   height:350,
   showTooltips:true,
   itemsAlwaysDraggable: true,
   selectable:true,
	 stack:true,
	 timeAxis:{
	 scale:'hour', step: 1},
	 autoResize:true,
   multiselect:true,
   maxHeight: 400,
   format:{
    minorLabels: {
    millisecond:'',
    second:     '',
    minute:     'HH:mm',
    hour:       'HH:mm',
    weekday:    'ddd D',
    day:        'D',
    week:       '',
    month:      'MMM',
    year:       'YYYY'
  },
  majorLabels: {
    millisecond:'',
    second:     '',
    minute:     'ddd D MMMM',
    hour:       'ddd D MMMM',
    weekday:    'MMMM YYYY',
    day:        'MMMM YYYY',
    week:       '',
    month:      'YYYY',
    year:       ''
  }
},
start: new Date ((new Date()).valueOf() - 10000000),
end: new Date (1000*60*60*24 + (new Date()). valueOf()),
min: new Date("2018-07-09T00:00:00+03:00"),
max: new Date("2018-07-16T00:00:00+03:00"),
editable:true,
  
  onAdd: function (item, callback) {
   item.content = prompt('Enter name for a new shift', item.content);
   item.start = prompt('Enter start time for a  shift',  item.start);
   if (item.end != null){
   item.end = prompt('Enter end time for a shift',item.end );
   }
   else{
   item.end = prompt('Enter end time for a shift',item.start );
   }
   if (item.end<item.start)
   {alert("Entered shift ends before it begins! Please, enter valid end time for your shift.");
    item.end = null;}
   
  if((item.content != null)&&(item.start != null)&&(item.end != null)){
   
  callback(item);}
  else{
  callback(null);
  }
  },
  onUpdate: function (item, callback) {
    item.content = prompt('Edit shift name:', item.content);
    if (item.content != null) {
      callback(item);  
    }
    else {
      callback(null);  
    }
  },
    
  onRemove: function(item, callback){
      result = confirm("Do you want to remove this shift?");
      if(result){
        callback(item);
      }
    else{
      callback(null);
    }
    }
  };
   
  const options1 = jQuery.extend(options, {
  tooltipOnItemUpdateTime: true
  });
  // Create a Timeline
   
  const timeline = new vis.Timeline(container, items, null, options);
    document.getElementById('window1').onclick = function() {
    timeline.setWindow('2018-07-09', '2018-07-16');
    };
    document.getElementById('fit').onclick = function() {
    timeline.fit()
    };