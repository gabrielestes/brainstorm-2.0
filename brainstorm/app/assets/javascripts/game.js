$(document).ready(function() {
    //GLOBAL VARIABLES
    var allRaindrops = [];
    var interval = 5000;
    var gameDuration = null;
    var currentGameScore = 0;

    //Mute button functionality
    $('.mute-button').on('click', function() {
        $(this).toggleClass('active');
        $('.music').prop('muted', !$('.music').prop('muted'));
    });

    //Start Game button
    $('.start-game').on('click', function() {
        $('.start-game').hide();
        makeItRain();
    });

    //Solution-field
    $('form').on('keypress', '.solution-field', function(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            var userSolution = $(this).val();
            checkAnswers(userSolution);
            $(this).val('');
        }
    });

    //Game FUNCTIONS
    function makeItRain() {
        currentGameScore = 0;
        new Raindrop();
        setFocus();
        hideCursor();
        runGame();
    }

    // function playMusic() {
    //   $('.music').on("load", function() {
    //        $('.music').play();
    //    }, true);
    //    $('.start').click(function() {
    //        $('.music').play();
    //    });
    // }

    function hideCursor() {
        $('html').css({
            cursor: 'none'
        });
        setTimeout(function() {
            $('.game-container').mousemove(function() {
                $('html').css({
                    cursor: 'auto'
                });
            });
        }, 300);

    }

    function setFocus() {
        var input = $('.solution-field');
        input.focus();
    }

    function runGame() {
        gameDuration = setInterval(function() {
            if (checkAnswers) {
                new Raindrop();
                interval -= 20;
            }

        }, interval);
    }

    function endGame() {
        setTimeout(function() {
            clearInterval(gameDuration);
        }, 900000);
    }

    function checkAnswers(userSolution) {
        if (!userSolution) {
            return true;
        }
        var numSolution = Number(userSolution);
        var correctOperators = [];
        for (var index = allRaindrops.length - 1; index >= 0; index--) {
            var drop = allRaindrops[index];
            if (drop.values.solution === numSolution) {
                allRaindrops.splice(index, 1);
                drop.self.remove().fadeOut();
                correctOperators.push(drop.values.operator);
            }
        }
        scoreSolution(correctOperators);
        userSolution = null;
        numSolution = null;
    }

    function scoreSolution(operators) {
        var scoreValue = 0;
        if (operators.length === 0) {
            scoreValue = "incorrect";
        } else {
            var multiplier = operators.length;
            for (var index = 0; index < operators.length; index++) {
                switch (operators[index]) {
                    case "+":
                        scoreValue = (scoreValue + 1000) * multiplier;
                        break;
                    case "-":
                        scoreValue = (scoreValue + 1500) * multiplier;
                        break;
                    case "*":
                        scoreValue = (scoreValue + 2000) * multiplier;
                        break;
                    case "/":
                        scoreValue = (scoreValue + 2500) * multiplier;
                        break;
                    default:
                        console.log("something went wrong");
                        break;
                }
            }
            multiplier = 0;
        }
        postScore(scoreValue);
    }

    function postScore(scoreValue) {
        if (scoreValue === "incorrect") {
            $('.solution-score').text(scoreValue);
        } else {
            $('.solution-score').text("CORRECT! : +" + scoreValue);
            currentGameScore += scoreValue;
            $('.current-score').text("SCORE : " + currentGameScore);
        }

    }

    //CONTRUCTORS
    function Raindrop() {
        this.values = {
            firstNumber: null,
            secondNumber: null,
            operator: null,
            solution: null
        };

        this.init = function() {
            this.generateProblem();
            this.self = this.createRaindrop();
            allRaindrops.push(this);
        };
        this.init();
    }

    //PROTOTYPES
    Raindrop.prototype = {
        generateOperator: function() {
            var operator = "";
            var operNumber = Math.ceil(Math.random() * 4);
            if (operNumber === 1) {
                operator = "+";
            } else if (operNumber === 2) {
                operator = "-";
            } else if (operNumber === 3) {
                operator = "*";
            } else {
                operator = "/";
            }
            this.values.operator = operator;
            return operator;
        },

        generateNumbers: function(operator) {
            if (operator === "+" || operator === "-") {
                this.genNumAddSub();
            } else if (operator === "*") {
                this.genNumMultiply();
            } else {
                this.genNumDivide();
            }
        },

        genNumAddSub: function() {
            var operand1 = Math.ceil(Math.random() * 20),
                operand2 = Math.ceil(Math.random() * 15);
            this.values.firstNumber = operand1;
            this.values.secondNumber = operand2;
        },

        genNumMultiply: function() {
            var operand = Math.ceil(Math.random() * 15),
                multiplier = Math.ceil(Math.random() * 10);
            this.values.firstNumber = operand;
            this.values.secondNumber = multiplier;
        },

        genNumDivide: function() {
            var divider = Math.ceil(Math.random() * 13);
            var operand = (Math.ceil(Math.random() * 15)) * divider;
            this.values.firstNumber = operand;
            this.values.secondNumber = divider;
        },

        generateProblem: function() {
            this.generateNumbers(this.generateOperator());
            var solution = null,
                operator = this.values.operator,
                firstNumber = this.values.firstNumber,
                secondNumber = this.values.secondNumber;
            switch (operator) {
                case "+":
                    solution = firstNumber + secondNumber;
                    break;
                case "-":
                    solution = firstNumber - secondNumber;
                    break;
                case "*":
                    solution = firstNumber * secondNumber;
                    break;
                default:
                    solution = firstNumber / secondNumber;
            }
            this.values.solution = solution;
        },

        createRaindrop: function() {
            var posLeft = Math.ceil(Math.random() * 70);
            $('.game-container').prepend($('<div/>').addClass('raindrop').css({
                'left': posLeft + '%'
            }).text(this.values.firstNumber + this.values.operator + this.values.secondNumber));
            this.rainFall(this.setRainSpeed());
            return $('.raindrop').first();
        },

        setRainSpeed: function() {},

        rainFall: function(rainSpeed) {}
    };

});
