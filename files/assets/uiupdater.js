$(document).ready(function() {
	
	var tmp = getTmpContent();
	if(tmp) {
		$('#postmeta [name="blog"]').val(tmp.blogid);
		$('#postmeta [name="urlfragment"]').val(tmp.urlfrag);
		$('#postcontent [name="title"]').val(tmp.arttitle);
		$('#postcontent [name="description"]').val(tmp.artcontent);
		deleteTmpContent();
	}
	
	var posttypeselect = $('select[name="posttype"]'), posttypeval = posttypeselect.val();
	posttypeselect.change(function(){
		var newtype = posttypeselect.val();
		updatePostType(posttypeval, newtype);
		posttypeval = newtype;
	});
	$('.type1 input[name="description"]').keypress(function() { getImageSrc(); });
	$('.type1 input[name="description"]').change(function() { getImageSrc(); });
	
	getImageSrc();
});

function getImageSrc() {
	var url = $('.type1 input[name="description"]').val();
	if(url) {
		$('.type1 img.imgcontent').attr('src', url);
		$('.type1 img.imgcontent').css('display', 'block');
	} else {
		$('.type1 img.imgcontent').css('display', 'none');
	}
}

function updatePostType(oldType, newType) {
	if(oldType != newType) {
		var	blogid = $('#postmeta [name="blog"]').val();
		var	urlfrag = $('#postmeta [name="urlfragment"]').val();
		var	arttitle = $('#postcontent [name="title"]').val();
		var	artcontent = $('#postcontent [name="description"]').val();
		setTmpContent({
			"blogid":blogid,
			"urlfrag":urlfrag,
			"arttitle":arttitle,
			"artcontent":artcontent
		});
		reloadPageWithNewPostType(newType);
	}
}

function deleteTmpContent() { sessionStorage.removeItem("tmpContent"); }
function setTmpContent(cnt) { sessionStorage.setItem("tmpContent", JSON.stringify(cnt)); }
function getTmpContent() {
	var cnt = sessionStorage.tmpContent;
	if(cnt) return JSON.parse(cnt);
	else return null;
}

function reloadPageWithNewPostType(newPostType){
	var current = window.location.href,
		protocol = window.location.protocol;
	var parts = current.substring(protocol.length+2,current.length).split('/');
	if(parts[2] === "edit") parts[4] = newPostType;
	else parts[3] = newPostType;
		
	var url = parts.join('/');
	window.location.href = protocol+'//'+url;
}