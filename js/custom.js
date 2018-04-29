var TreeView = {
    branchA: "|-- ", branchB: "`-- ", stem: "|   ", space: "    ",
    generate: function (input) {
        var list = input.split("\n");
        list = list.reverse();
        var output = [];
        var levelMemo = [];
        list.forEach(function (val) {
            var level = 0;
            while (val.charAt(level) === " ") {
                level++;
                if (levelMemo.length < level) {
                    levelMemo.push(false);
                }
            }

            var rowStr = "";
            for (var i = 1; i < level; i++) {
                if (levelMemo[i - 1]) {
                    rowStr += TreeView.stem;
                } else {
                    rowStr += TreeView.space;
                }
            }
            if (level === 0) {
                rowStr += val.trim();
            } else if (levelMemo[level - 1]) {
                rowStr += TreeView.branchA + val.trim();
            } else {
                rowStr += TreeView.branchB + val.trim();
            }
            output.push(rowStr);

            if (level !== 0) {
                levelMemo[level - 1] = true;
            }
            if (levelMemo.length > level) {
                levelMemo[level] = false;
            }
        });
        output = output.reverse().join("\n");
        return output;
    }
};

var input = CodeMirror.fromTextArea($("#input").get(0),
    {lineNumbers: true, viewportMargin: Infinity});
var output = CodeMirror.fromTextArea($("#output").get(0),
    {lineNumbers: true, viewportMargin: Infinity, readOnly: true});

input.on("change", function (cm) {
    output.getDoc().setValue(TreeView.generate(cm.getValue()));
});

input.setValue("this\n is\n  an\n   example\n try\n  editing\n  the\n  input\n good\n luck");