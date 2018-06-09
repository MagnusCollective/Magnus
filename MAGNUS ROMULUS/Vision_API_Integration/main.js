/*This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.
  
  You should have received a copy of the GNU General Public License
  along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
 
 /*This is developed by Magnus Collective. This program is used to 
 Send an image with conditions using the google api and display the results of the image.
 */
'use strict';

var CV_URL = 'https://vision.googleapis.com/v1/images:annotate?key=' + window.apiKey;
var type;
$(function () {
  $('#fileform').on('submit', uploadFiles);
});


function uploadFiles (event) {
  event.preventDefault(); // Prevent the default form post

  // Grab the file and asynchronously convert to base64.
  var file = $('#fileform [name=fileField]')[0].files[0];
  var reader = new FileReader();
  reader.onloadend = processFile;
  reader.readAsDataURL(file);
}

function processFile (event) {
  var content = event.target.result;
  sendFileToCloudVision(content.replace('data:image/jpeg;base64,', ''));
}

function sendFileToCloudVision (content) {
  type = $('#fileform [name=type]').val();
  console.log(type);
  // Strip out the file prefix when you convert to json.
  var request = {
    requests: [{
      image: {
        content: content
      },
      features: [{
        type: type,
        maxResults: 200
      }]
    }]
  };

  $('#results').text('Loading...');
  $.post({
    url: CV_URL,
    data: JSON.stringify(request),
    contentType: 'application/json'
  }).fail(function (jqXHR, textStatus, errorThrown) {
    $('#results').text('ERRORS: ' + textStatus + ' ' + errorThrown);
  }).done(displayJSON);
}

/**
 * Displays the results.
 */
function displayJSON (data) {
	if(type == "FACE_DETECTION")
	{
		try{
		
		var contents = JSON.stringify(data.responses[0].faceAnnotations[0].landmarks, null, 1);
		var contents2 = contents.replace(/[\[\]\{\"\,\}]+/g, '');
		}
		catch(e){
		var contents2 = "No Face Detected";
		}
		
	}
	else if(type == "LABEL_DETECTION")
	{
		
		var contents = JSON.stringify(data.responses[0].labelAnnotations, null, 1);
		var count = Object.keys(data.responses[0].labelAnnotations).length;
		console.log(count);
		var count1;
		var Lcontents = new Array(count1);
		var Lcontents1 = new Array(count1);
		//var Lcontents[count];
		for(count1=0;count1<count;count1++)
			{
				Lcontents[count1] = JSON.stringify(data.responses[0].labelAnnotations[count1].description, null, 1);
				Lcontents1[count1] = Lcontents[count1].replace(/[\[\]\{\"\,\}]+/g, '');
			}
		
		
		var contents2 = Lcontents1
		
	}
	else if(type == "SAFE_SEARCH_DETECTION")
	{
		console.log(type);
		var contents = JSON.stringify(data.responses[0].safeSearchAnnotation, null, 1);
		var contents2 = contents.replace(/[\[\]\{\"\,\}]+/g, '');
	}
	else if(type == "TEXT_DETECTION")
	{
		try{
		console.log(type);
		var contents = JSON.stringify((data.responses[0].textAnnotations[0].description), null, 1);
		var contents3 = contents.replace(/[\[\]\{\"\,\}]+/g, ' ');
		var r = /nnn/gi;
		
		var contents4 = contents3.replace(/\\n/g, 'nnn');
		var contents2 = contents4.replace(r, ' || ');
		}
		catch(e){
			
		var contents2 = "No Text Detected";
		}
		
		
	}
	else if(type == "IMAGE_PROPERTIES")
	{
		
		console.log(type);
		var contents = JSON.stringify(data.responses[0].imagePropertiesAnnotation, null, 1);
		
		var contents2 = contents.replace(/[\[\]\{\"\,\}]+/g, '');;
		
	}
	else if(type == "LANDMARK_DETECTION")
	{
		
		console.log(type);
		var contents = JSON.stringify(data, null, 1);
		
		var contents2 = contents
		//.replace(/[\[\]\{\"\,\}]+/g, '');
		
	}
  
  
  
  $('#results').text(contents2);
  var evt = new Event('results-displayed');
  evt.results = contents2;
  
  
  
  

}