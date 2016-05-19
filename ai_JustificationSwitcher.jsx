// Illustratorで位置キープで文字揃え方向を変えるやつ
// 2016.05.18  by（z-）

function main () {
    if (! app.documents.length) return;
    var sel = app.activeDocument.selection;
    //if (! sel.length) return; // 不要でしたな
    
    var obj, top, left;
    var pepsi = { };
    pepsi ["左 / 上揃え"] = Justification.LEFT; //揃えオブジェクトぶっこんでおくところ
    pepsi ["中央揃え"] = Justification.CENTER;
    pepsi ["右 / 下揃え"] = Justification.RIGHT;
    
    while (sel.length) { // いちおうよくばりループ
        obj = sel.shift ();
        if (!sel.reflect.name.match(/TextFrame|Array/)) continue; //ここ未検証てきとう(若干改善)
        top = sel.top;
        left = sel.left;
        changeJustification (obj, pepsi[win.D.selection.text]); //これから実装する関数
        sel.top = top;
        sel.left = left;
        }
    }

function changeJustification (obj, val) { // あとでかく
    obj.story.textRange.justification=val;
    }


var listAry=["左 / 上揃え", "中央揃え", "右 / 下揃え"];
var dlg="dialog{orientation:'column', text:'justificationSwitcher', \
D:DropDownList{}, \
B:Button{text:'please', properties:{name:'ok'}}\
}";

var win = new Window (dlg);
win.spacing -= 8;
win.D.size = [200, 20];
for (i = 0; i < listAry.length; i ++) {
	win.D.add ("item", listAry [i]);
	}

win.D.selection = (2); //どうせ左 / 上揃えからの変更が多いと思うので右 / 下揃えをデフォに
var res = win.show ();
if (res != 2) main ();
