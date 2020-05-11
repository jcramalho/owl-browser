var express = require('express')
var router = express.Router()

var axios = require('axios')

router.get('/', async (req, res,next) => {
    try{
        var dot = "";
        var response = await axios.get("http://localhost:4001/ontologia");
        var classes = response.data.map(c => c.idClasse ? c.idClasse : "");
        var dot = " digraph DiagramaClasses {\n" +
                    'rankdir=LR ;\n' +
                    'node [style="filled"];\n' +
                    'start [label="Cinemateca",fillcolor=lightgrey];\n'
        for(let i=0; i < classes.length; i++){
            dot += 'f'+i+' [label="'+classes[i]+'",href=""];\n'
            dot += 'start -> f'+i+' [label="is-a"];\n'
        }
        dot += '}'
        console.log('\n\n\n'+dot)
        res.render("showClasse", {renderingCode:'d3.select("#graph").graphviz().renderDot(\`'+dot+'\`)'})
    }
    catch(e){
        console.log("Erro no acesso à ontologia: " + e);
    }
})
            
module.exports = router;
