
var userXID="";
for(let i=0;i<10;i++){userXID+=(Math.random()%100).toString(32).substring(2,4);}

document.getElementById("representUserXID").innerHTML="セッションID: "+userXID;

var expID="S1G3";
var expTag="ExpS1";
var expFolder="S1G3_662Yos";

var candModel=[50,57,58,61,65,66,67,69,70,71,73,74,75,76,82,83,84,85,88,90,91,93,94,95,97,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124];
var listName=['磯野みき','三輪みさと','竹中ともみ','難波さとし','藤村のぶあき','熊田せいいち','藤田たかひろ','角田さちえ','塚原ともみ','広瀬ふみひこ','多田じゅん','横尾みえ','須賀しんいちろう','小柳あやか','野中こういち','緒方つよし','倉橋あいこ','勝田ゆうき','奧山まなみ','中山りさ','玉田ねね','河田まさき','矢田こうじ','樋口りょう','柿沼のりお','倉橋すみれ','磯野こういち','磯野このみ','磯野ひでゆき','嶋田ゆいか','玉田たかし','秋元みゆき','三橋たまみ','藤村わかな','広瀬りょう','岩下じゅんいち','柿沼えいじ','藤田みほ','柳瀬こうすけ','多田ようすけ','倉橋ゆうき','長浜ようへい','島しんや','角田ただし','河田こうじ','白川しょうこ','島かなこ','秋元しょうこ','竹中たくみ','多田きょうこ'];
var candSong=[648,1769,251,664,1625,2372,707,1488,2905,1753,1180,1124,168,2279,2298,2009,2119,166,1229,2725];


var varAge="-1";
var varListenTime="-1";
var varMusicActivity="-1";
var varHarmonyEducation="-1";

var descriptions=["曲を評価（任意）","ひどすぎる","とても悪い","悪い","少し悪い","まずまず","少し良い","良い","とても良い","素晴らしい","芸術的"];

var curRatingA=0;
var curDesriptionA=descriptions[0];
var curRatingB=0;
var curDesriptionB=descriptions[0];

var status = "inquiry";
//inquiry or selecting or selected

xhr = new XMLHttpRequest();


var curAID="";
var curBID="";
var curSong="";
var curASong="";
var curBSong="";
var curAName="";
var curBName="";
var curFaceA="";
var curFaceB="";
var curMp3A="";
var curMp3B="";


document.getElementById('sendButton').addEventListener('click', function(event){

	if(status=="inquiry"){
//		console.log(varAge,varListenTime,varMusicActivity,varHarmonyEducation);

		status="selecting";
		document.getElementById("questionnare").hidden = true;

		SetupTest();

	}else if(status=="selecting"){

		let chosenID=((document.getElementById("radio1").checked)? curAID:curBID);

		xhr.open('POST', 'https://creevo-art.com/experiment/');
		xhr.setRequestHeader( 'Content-Type', 'application/json' );
		var data = {"expID":expID, "userXID":userXID, "varAge":varAge, "varListenTime":varListenTime, "varMusicActivity":varMusicActivity, "varHarmonyEducation":varHarmonyEducation, "curAID":curAID, "curBID":curBID, "curASong":curASong, "curBSong":curBSong, "chosenID":chosenID, "curRatingA":curRatingA, "curRatingB":curRatingB, };
		xhr.send( JSON.stringify(data) );

		status="selected";
		document.getElementById("main_sentence").innerHTML="AはAI作曲家「"+curAName+"」、Bは「"+curBName+"」の作った曲でした";
		document.getElementById("sendButton").value="次の聴き比べに進む";
		document.getElementById("labelSendButton").innerHTML="次の聴き比べに進む";

		document.getElementById("faceA").src=curFaceA;
		document.getElementById("faceB").src=curFaceB;

		document.getElementById("label1").innerHTML=curAName;
		document.getElementById("label2").innerHTML=curBName;
		document.getElementById("exit_sentence").innerHTML="<a href=\"https://creevomusic.github.io/exp/thankyou.html\">今日の聴き比べはここまでにする</a>";

		$('#boxA').removeClass("box-clickable").addClass("box-noclickable");
		$('#boxB').removeClass("box-clickable").addClass("box-noclickable");
		$('#ratingBoxA').removeClass("box-clickable").addClass("box-noclickable");
		$('#ratingBoxB').removeClass("box-clickable").addClass("box-noclickable");
		$('#label1').removeClass("box-clickable").addClass("box-noclickable");
		$('#label2').removeClass("box-clickable").addClass("box-noclickable");

	}else if(status=="selected"){

		$('#boxA').removeClass("box-notclickable").addClass("box-clickable");
		$('#boxB').removeClass("box-notclickable").addClass("box-clickable");
		$('#ratingBoxA').removeClass("box-notclickable").addClass("box-clickable");
		$('#ratingBoxB').removeClass("box-notclickable").addClass("box-clickable");
		$('#label1').removeClass("box-notclickable").addClass("box-clickable");
		$('#label2').removeClass("box-notclickable").addClass("box-clickable");

		status="selecting";
		SetupTest();

	}//endif

});

document.getElementsByName('selector').forEach(function(e) {
	e.addEventListener("click", function() {
		if(status=="selecting"){
			if(document.querySelector("input:checked[name=selector]").value=="A"){
				ClickedA();
			}else{
				ClickedB();
			}//endif
		}//endif
	});
});

document.getElementById('boxA').addEventListener('click', function(event){
	if(status=="selecting"){
		ClickedA();
	}//endif
});
document.getElementById('boxB').addEventListener('click', function(event){
	if(status=="selecting"){
		ClickedB();
	}//endif
});

function ClickedA(){
	document.getElementById("sendButton").disabled=false;
	document.getElementById("boxA").style.backgroundColor = '#ff9245';
	document.getElementById("boxB").style.backgroundColor = '#eeeeee';
	document.getElementById("radio1").checked = true;
}//end ClickedA

function ClickedB(){
	document.getElementById("sendButton").disabled=false;
	document.getElementById("boxA").style.backgroundColor = '#eeeeee';
	document.getElementById("boxB").style.backgroundColor = '#ff9245';
	document.getElementById("radio2").checked = true;
}//end ClickedB

function SetupTest(){

	document.getElementById("boxAContainer").hidden = false;
	document.getElementById("boxSpacer").hidden = false;
	document.getElementById("boxBContainer").hidden = false;

	document.getElementById("main_sentence").innerHTML="AとBのメロディーを聴いて、自分が良いと思う方を選んでください";
	document.getElementById("sendButton").value="結果を送る";
	document.getElementById("labelSendButton").innerHTML="結果を送る";

	document.getElementById("radio1").checked = false;
	document.getElementById("radio2").checked = false;
	document.getElementById("sendButton").disabled=true;
	document.getElementById("boxA").style.backgroundColor = '#eeeeee';
	document.getElementById("boxB").style.backgroundColor = '#eeeeee';

	document.getElementById("faceA").src="https://creevomusic.github.io/exp/image/Mugao.png";
	document.getElementById("faceB").src="https://creevomusic.github.io/exp/image/Mugao.png";

	document.getElementById("label1").innerHTML="Aの方が良い";
	document.getElementById("label2").innerHTML="Bの方が良い";

	document.getElementById("exit_sentence").innerHTML="";

	let posA=Math.floor( Math.random() * candModel.length );
	let gap=Math.floor( Math.random() * (candModel.length-1) )+1;
	let posB=(posA+gap)%(candModel.length);
	let posSong=Math.floor( Math.random() * candSong.length );

// 	console.log(posA,posB);
// 	console.log(posSong);

	curAID=expTag+'_'+String(candModel[posA]);
	curBID=expTag+'_'+String(candModel[posB]);
	curSong=String(candSong[posSong]);

//	curAID='ExpS0_0';
//	curBID='ExpS0_11';
//	curSong='1690';
//	console.log(curAID,curBID,curSong);

	curAName=listName[posA];
	curBName=listName[posB];

	curASong=expID+'_'+curAID+'_song_'+curSong;
	curBSong=expID+'_'+curBID+'_song_'+curSong;

	curMp3A='https://creevo-music.com/experiment/'+expFolder+'/'+curASong+'.mp3';
	curMp3B='https://creevo-music.com/experiment/'+expFolder+'/'+curBSong+'.mp3';

	curFaceA='https://creevo-music.com/experiment/'+expFolder+'/'+curAID+'.png';
	curFaceB='https://creevo-music.com/experiment/'+expFolder+'/'+curBID+'.png';

	document.getElementById("Audio1A").src=curMp3A;
	document.getElementById("Audio1B").src=curMp3B;

	ClearRating();

}//end SetupTest

function ClearRating(){
	curRatingA=0;
	curDesriptionA=descriptions[0];
	curRatingB=0;
	curDesriptionB=descriptions[0];
	$('.starA').siblings().removeClass('star-color').addClass( "star-nocolor" );
	$('.starA').siblings().removeClass('selectedA');
	$('.starB').siblings().removeClass('star-color').addClass( "star-nocolor" );
	$('.starB').siblings().removeClass('selectedB');
	document.getElementById("popup_descriptionA").innerHTML=curDesriptionA;
	document.getElementById("popup_descriptionB").innerHTML=curDesriptionB;
}//end ClearRating


document.getElementsByName('age').forEach(function(e) {
	e.addEventListener("click", function() {
		varAge=document.querySelector("input:checked[name=age]").value;
		AnsweredQuestion();
	});
});

document.getElementsByName('listenTime').forEach(function(e) {
	e.addEventListener("click", function() {
		varListenTime=document.querySelector("input:checked[name=listenTime]").value;
		AnsweredQuestion();
	});
});

document.getElementsByName('musicActivity').forEach(function(e) {
	e.addEventListener("click", function() {
		varMusicActivity=document.querySelector("input:checked[name=musicActivity]").value;
		AnsweredQuestion();
	});
});

document.getElementsByName('harmonyEducation').forEach(function(e) {
	e.addEventListener("click", function() {
		varHarmonyEducation=document.querySelector("input:checked[name=harmonyEducation]").value;
		AnsweredQuestion();
	});
});

function AnsweredQuestion(){
	if(varAge!="-1" && varListenTime!="-1" && varMusicActivity!="-1" && varHarmonyEducation!="-1"){
		document.getElementById("sendButton").disabled=false;
	}//endif
}//end AnsweredQuestion


$('.starA').on('mouseover', function(){
	if(status=="selecting"){
		var $this = $(this);
		$this.nextAll().removeClass('star-color').addClass( "star-nocolor" );
		$this.prevAll().removeClass( "star-nocolor" ).addClass('star-color');
		$this.removeClass( "star-nocolor" ).addClass('star-color');
		let tmpRating=parseInt($this.attr('id').slice(-2));
		document.getElementById("popup_descriptionA").innerHTML=descriptions[tmpRating];
	}//endif
});
$('.starA').on('mouseleave', function(){
	if(status=="selecting"){
		var select = $('.selectedA');
		if(select.attr('id') == undefined){
			var $this = $(this);
			$this.removeClass('star-color').addClass( "star-nocolor" );
			$this.siblings().removeClass('star-color').addClass( "star-nocolor" );
		}else{
			select.nextAll().removeClass('star-color').addClass( "star-nocolor" );
			select.prevAll().removeClass( "star-nocolor" ).addClass('star-color');
			select.removeClass( "star-nocolor" ).addClass('star-color');
		}//endif
		document.getElementById("popup_descriptionA").innerHTML=curDesriptionA;
	}//endif
});
$('.starA').on('click',function(){
	if(status=="selecting"){
		var $this = $(this);
		$this.addClass('selectedA').siblings().removeClass('selectedA');
		curRatingA=parseInt($this.attr('id').slice(-2));
		curDesriptionA=descriptions[curRatingA];
		document.getElementById("popup_descriptionA").innerHTML=curDesriptionA;
	}//endif
});

$('.starB').on('mouseover', function(){
	if(status=="selecting"){
		var $this = $(this);
		$this.nextAll().removeClass('star-color').addClass( "star-nocolor" );
		$this.prevAll().removeClass( "star-nocolor" ).addClass('star-color');
		$this.removeClass( "star-nocolor" ).addClass('star-color');
		let tmpRating=parseInt($this.attr('id').slice(-2));
		document.getElementById("popup_descriptionB").innerHTML=descriptions[tmpRating];
	}//endif
});
$('.starB').on('mouseleave', function(){
	if(status=="selecting"){
		var select = $('.selectedB');
		if(select.attr('id') == undefined){
			var $this = $(this);
			$this.removeClass('star-color').addClass( "star-nocolor" );
			$this.siblings().removeClass('star-color').addClass( "star-nocolor" );
		}else{
			select.nextAll().removeClass('star-color').addClass( "star-nocolor" );
			select.prevAll().removeClass( "star-nocolor" ).addClass('star-color');
			select.removeClass( "star-nocolor" ).addClass('star-color');
		}//endif
		document.getElementById("popup_descriptionB").innerHTML=curDesriptionB;
	}//endif
});
$('.starB').on('click',function(){
	if(status=="selecting"){
		var $this = $(this);
		$this.addClass('selectedB').siblings().removeClass('selectedB');
		curRatingB=parseInt($this.attr('id').slice(-2));
		curDesriptionB=descriptions[curRatingB];
		document.getElementById("popup_descriptionB").innerHTML=curDesriptionB;
	}//endif
});

