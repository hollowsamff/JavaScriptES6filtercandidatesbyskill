//Program is used to filter an array of candidates by skill
//Candidates that will be filtered by skill
const newCandidates = [{
                name: "Sam",
                skills: ["Ruby", "Python"]
            },
            {
                name: "Fran",
                skills: ["Python", "AWS", "JavaScript"]
            },
            {
                name: "Jack",
                skills: ["JavaScript", "Azure"]
            },
            {
                name: "Rand",
                skills: ["Java", "Docker"]
            },
            {
                name: "Mia",
                skills: ["AWS"]
            },
            {
                name: "Ria",
                skills: ["PHP", "AWS", ".Net"]
            },
            {
                name: "Kuro",
                skills: ["PHP", ".Net", "Docker"]
            },
        ];

        function getRandomInt(min, max) { //Used to generate random id for every candidate row in table - outside createFilterTable class since the user might need to generate a random number for a diffent method or class on the page 
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
        }

        //Class is used to filter an array of candidates by skill

        //Classes are a way to organize the code into generic, reusable pieces
        //This means the user can create a new instance of the class for every skill they want to filter the array of candidates by. This means they do not have to duplicate the code to filter the array for different skills, which complies with DRY principles  
        //Other benefits of using classes are:
        //Convenient, self-contained syntax. 
        //A single, canonical way to emulate classes in JavaScript. Prior to ES6, there were several competing implementations in popular libraries.
        //More familiar to people from a class-based language background.*/

        let createFilterTable = class {

            constructor(newCandidatesArray, skillFilter) {
                this.newCandidates = newCandidatesArray;
                this.candidatesTable = document.getElementById("candidates_example"); //Original table that will be cloned to create new table of new candidates
                this.skillFilter = skillFilter; //Hold skill used to filter candidates
                this.newCandidatesTable = null; //Used to hold filtered candidates
            }

            main() {

                if (this.errorTestSentValues()) { //If user sends array of candidates and a skill to class create table 

                    this.createTable(); //Create table
                    this.outputTable(); //Show table                 
                }
            }

            errorTestSentValues() { //Make sure user sends skill and array of candidates to class when the instance of the class was created

                if (this.newCandidates === "") {

                    console.log("User did not send a array of candidates when the instance of the class was created");
                    return false;
                }

                if (typeof this.skillFilter === "undefined") {

                    console.log("User did not send a skill when the instance of the class was created");
                    return false;
                }

                return true;
            }


            createTable() {

                this.newCandidatesTable = this.candidatesTable.cloneNode(true); //Clone old table
                this.removeRowsFromTable(this.newCandidatesTable); //Remove old values from table

                const newTbody = this.newCandidatesTable.getElementsByTagName("tbody")[0];

                let tableCaption = this.newCandidatesTable.createCaption(); //Create table title
                tableCaption.innerHTML = "Only Candidate With " + this.skillFilter + " Skill Table";

                let randomNumber = getRandomInt(1, 1000);
                let tableId = false;
                while (!tableId == true) { //Loop until the generated is unique

                    tableId = this.skillFilter + "table" + randomNumber;
                }

                this.newCandidatesTable.setAttribute("id", tableId); //Set id of table - uses random number just in case the user tries to filter the same skill more than once (stop page having same id appearing twice)

                const filteredCandidates = this.filterCandidateBySkill(this.skillFilter); //Filter the candidates by input skill
                this.addCandidatesToTable(newTbody, filteredCandidates); //Add filtered candidates to table
            }

            //Remove old value from clonned table
            removeRowsFromTable(table) {

                const rows = table.getElementsByTagName("tr");
                while (rows.length > 1) {
                    table.deleteRow(1);
                }
                this.newCandidatesTable = table;
            }
            //Filter all the candidates that do not have the skill stored in the skill variable out of the candidates array 
            filterCandidateBySkill(skill) {
                return this.newCandidates.filter((currentValue, index, array) => array[index]["skills"].indexOf(skill) !== -1);
            }

            //Add candidates to table
            addCandidatesToTable(table, filteredCandidates) {
                filteredCandidates.forEach(candidate => this.insertCandidate(table, candidate.name, candidate.skills));
            }

            //Create row in table for every candidate
            insertCandidate(tbody, name, skills) {

                const newRow = tbody.insertRow();
                const nameCell = newRow.insertCell();
                const skillCell = newRow.insertCell();
                const candidateName = document.createTextNode(name);
                const candidateSkills = document.createTextNode(skills.join(', '));

                nameCell.appendChild(candidateName);
                skillCell.appendChild(candidateSkills);
            }

            outputTable() {
                document.body.appendChild(this.newCandidatesTable);
            }
        };

        //Create new instances of the class for differnt skills

        let tableJavascript = new createFilterTable(newCandidates, "JavaScript");
        tableJavascript.main();

        let tableDocker = new createFilterTable(newCandidates, "Docker");
        tableDocker.main();

        let tableRuby = new createFilterTable(newCandidates, "Ruby");
        tableRuby.main();

        let tablePHP = new createFilterTable(newCandidates, "PHP");
        tablePHP.main();

        let tableNet = new createFilterTable(newCandidates, ".Net");
        tableNet.main();

        let tableAWS = new createFilterTable(newCandidates, "AWS");
        tablePHP.main();

        let tableAzure = new createFilterTable(newCandidates, "Azure");
        tableAzure.main();

        //Used to test data errorTestSendValues method that checks if an array and skill is sent to createFilterTable class
        let tableNoSentData = new createFilterTable();
        tableNoSentData.main();
