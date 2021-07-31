
var userXID="";
for(let i=0;i<10;i++){userXID+=(Math.random()%100).toString(32).substring(2,4);}

document.getElementById("representUserXID").innerHTML="セッションID: "+userXID;

var expID="S1G1";
var expTag="ExpS1";
var expFolder="S1G1_y28eQG";

var candModel=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49];
var listName=['南ゆうじ','比嘉たかし','岩渕たけお','深田たかゆき','勝又としき','橋口けいこ','楠本まき','相川としお','滝沢たかお','大竹たかふみ','小畑けんじ','大内ゆうや','瀬川はじめ','益田みき','板橋きょうこ','藤原はるふみ','小久保あつし','楠だいすけ','矢島かおり','沖ゆうじろう','川端たいすけ','田辺しゅうへい','沢井かんな','滝川いずみ','佐川ゆう','竹下ひろよ','白鳥ひさよ','齊藤あんな','田尻なつみ','志田みつあき','川上かずまさ','紺野みつえ','楠ひろき','福岡なおみ','風間ふとし','坪井さちえ','豊島ゆうき','土橋やすひさ','山上よしまさ','朝倉ゆたか','大友ひろお','福田りゅうすけ','柴山ひでお','谷口まさなり','朝倉さとし','菊池ひろし','本田ひろし','相原じゅんいち','奧田たかゆき','根岸あつし'];
var candSong=[2943,2420,16,5,1128,2165,88,392,1657,2444,2915,1888,2737,1424,638,986,1850,1763,872,1042];

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


