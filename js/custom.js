var TreeView = {
    generate: function (input, ascii, indent) {
        var list = input.split("\n");
        list = list.reverse();
        var output = [];
        var levelMemo = [];
        list.forEach(function (val) {
            var level = 0;
            while (val.substr(level * indent.length, indent.length) === indent) {
                level++;
                if (levelMemo.length < level) {
                    levelMemo.push(false);
                }
            }

            var rowStr = "";
            for (var i = 1; i < level; i++) {
                if (levelMemo[i - 1]) {
                    rowStr += ascii.stem;
                } else {
                    rowStr += ascii.space;
                }
            }
            if (level === 0) {
                rowStr += val.trim();
            } else if (levelMemo[level - 1]) {
                rowStr += ascii.branchA + val.trim();
            } else {
                rowStr += ascii.branchB + val.trim();
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

var app = new Vue({
    el: '#app',
    data: {
        ascii: [
            {
                branchA: "|-- ", branchB: "`-- ", stem: "|   ", space: "    "
            }, {
                branchA: "+-- ", branchB: "+-- ", stem: "|   ", space: "    "
            }, {
                branchA: "├─ ", branchB: "└─ ", stem: "│   ", space: "    "
            }
        ],
        examples: [],
        preset: "0"
    },
    methods: {
        example: function (k) {
            return "this\n"
                   + app.ascii[k].branchA + "is\n"
                   + app.ascii[k].stem + app.ascii[k].branchB + "an\n"
                   + app.ascii[k].branchB + "example";
        },
        asciiChange: function (value) {
            output.setValue(TreeView.generate(input.getValue(), app.ascii[value], " "));
        }
    }
});

app.ascii.forEach(function (value, index) {
    app.examples.push(app.example(index));
});

var input = CodeMirror.fromTextArea($("#input").get(0),
    {lineNumbers: true, viewportMargin: Infinity, theme: "idea"});
var output = CodeMirror.fromTextArea($("#output").get(0),
    {lineNumbers: true, viewportMargin: Infinity, theme: "idea", readOnly: true});

input.on("change", function (cm) {
    output.setValue(TreeView.generate(cm.getValue(), app.ascii[app.preset], " "));
});

input.setValue("this\n is\n  an\n   example\n try\n  editing\n  the\n  input\n good\n luck");