'use strict';

$(document).ready(function () {

    // nav and header event handlers
    $('nav.menu').on('click', 'a', function () {
        $('a').removeClass('active');
        $(this).addClass('active');
    });
    $('header').on('click', 'a.menu', function () {
        $(this).toggleClass('active');
        $('.drop-nav').toggleClass('active');
    });
    $('h1.logo').hover(function () {
        $('.lightning').css('display', 'block');
        $('.storm').css('display', 'none');
    }, function () {
        $('.lightning').css('display', 'none');
        $('.storm').css('display', 'block');
    });

    //GLOBAL VARIABLES

    var allRaindrops = [];
    //this is the interval between the creation of new drops
    var interval = 3000;
    //this is the rate by which interval is decreased when each drop is made
    var frequencyIncrese = 70;
    //this is the amount of time(ms) that it take a drop to reach the bottom when the game begins
    var rainSpeed = 14000;
    //this is the amount of time(ms) which elapse before the fall speed increases
    var increaseSpeedInterval = 30000;
    var gameDuration = null;
    var currentGameScore = 0;
    var assets = new Audio('/assets/music/game_music.mp3');

    //Mute button functionality
    $('.mute-button').on('click', function () {
        $(this).toggleClass('active');
        if (audio.play()) {
            audio.pause();
        } else {
            audio.play();
        }
    });

    //Start Game button
    $('.start-game').on('click', function () {
        // audio.play();
        makeItRain();
    });

    //Solution-field
    $('form').on('keypress', '.solution-field', function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            var userSolution = $(this).val();
            checkAnswers(userSolution);
            $(this).val('');
        }
    });

    //Game FUNCTIONS
    function makeItRain() {
        $('.start-game').hide();
        new Raindrop();
        setFocus();
        hideCursor();
        runGame();
        setRainSpeed();
    }

    function hideCursor() {
        $('html').css({
            cursor: 'none'
        });
        setTimeout(function () {
            $('.game-container').mousemove(function () {
                $('html').css({
                    cursor: 'auto'
                });
            });
        }, 300);
    }

    function setFocus() {
        var input = $('.solution-field');
        input.attr("readonly", false);
        input.focus();
    }

    function runGame() {
        gameDuration = setInterval(function () {
            if (checkAnswers) {
                new Raindrop();
                interval -= frequencyIncrese;
            }
        }, interval);
    }

    function setRainSpeed() {
        setInterval(function () {
            rainSpeed -= 500;
            return rainSpeed;
        }, increaseSpeedInterval);
    }

    function endGame() {
        $(this).siblings('.raindrops').remove();
        $('.solution-field').attr("readonly", true);
        clearInterval(gameDuration);
        alert("GAME OVER");
        pushValues();
        // reset();
        // $('.start-game').show().val('Play Again');
    }

    function pushValues() {
        $('.score-to-send').val(currentGameScore);
        $('.score-submission').submit();
    }

    //Page refresh on form submission makes this funciton superfluous, but I'm leaving it in because I would eventually like to preventDefault and use this for smoother gameplay
    // function reset() {
    //     allRaindrops = [];
    //     interval = 3000;
    //     gameDuration = null;
    //     currentGameScore = 0;
    //     rainSpeed = 14000;
    // }

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
                drop.self.remove().stop();
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
                        alert("Something went wrong");
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
            $('.solution-score').text("CORRECT! :" + "\n" + "+" + scoreValue);
            currentGameScore += scoreValue;
            $('.current-score').text("SCORE :" + "\n" + currentGameScore);
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

        this.init = function () {
            this.generateProblem();
            this.self = this.createRaindrop();
            this.rainFall(this.self, rainSpeed);
            allRaindrops.push(this);
        };
        this.init();
    }

    //PROTOTYPES
    Raindrop.prototype = {
        generateOperator: function generateOperator() {
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

        generateNumbers: function generateNumbers(operator) {
            if (operator === "+" || operator === "-") {
                this.genNumAddSub();
            } else if (operator === "*") {
                this.genNumMultiply();
            } else {
                this.genNumDivide();
            }
        },

        genNumAddSub: function genNumAddSub() {
            var operand1 = Math.ceil(Math.random() * 20),
                operand2 = Math.ceil(Math.random() * 15);
            this.values.firstNumber = operand1;
            this.values.secondNumber = operand2;
        },

        genNumMultiply: function genNumMultiply() {
            var operand = Math.ceil(Math.random() * 15),
                multiplier = Math.ceil(Math.random() * 10);
            this.values.firstNumber = operand;
            this.values.secondNumber = multiplier;
        },

        genNumDivide: function genNumDivide() {
            var divider = Math.ceil(Math.random() * 12);
            var operand = Math.ceil(Math.random() * 13) * divider;
            this.values.firstNumber = operand;
            this.values.secondNumber = divider;
        },

        generateProblem: function generateProblem() {
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

        createRaindrop: function createRaindrop() {
            var posLeft = Math.ceil(Math.random() * 69 + 13);
            $('.game-container').prepend($('<div/>').addClass('raindrop').css({
                'left': posLeft + '%'
            }).text(this.values.firstNumber + this.values.operator + this.values.secondNumber));
            return $('.raindrop').first();
        },

        rainFall: function rainFall(drop, rainSpeed) {
            $(drop).animate({
                "top": "87%"
            }, rainSpeed, function () {
                endGame();
            });
        }
    };
});
