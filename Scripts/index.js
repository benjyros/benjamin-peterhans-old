$(document).ready(function () {

    var skills = new Array;
    var percentages = new Array;
    var languages = new Array;
    var fileNames = new Array;
    var webLanguages = new Array;
    var webLinks = new Array;

    var language = "english";

    $.getJSON("Datas/skills.json", function (data) {
        for (var i = 0; i < data.skills.length; i++) {
            skills[i] = data.skills[i].skill;
            percentages[i] = data.skills[i].percentage;
        }
    });

    $.getJSON("Datas/languages.json", function (data) {
        for (var i = 0; i < data.languages.length; i++) {
            languages[i] = data.languages[i].language;
            fileNames[i] = data.languages[i].file;
        }
    });

    $.getJSON("Datas/weblanguages.json", function (data) {
        for (var i = 0; i < data.weblanguages.length; i++) {
            webLanguages[i] = data.weblanguages[i].language;
            webLinks[i] = data.weblanguages[i].link;
        }
        buildSections();
    });

    function buildSections() {
        buildProfileSection();
        addHR();
        buildIntroductionSection();
        addHR();
        buildSkillsSection();
        addHR();
        buildGithubSection();
    }

    function addHR() {
        $(".main").append('<hr>');
    }

    function buildProfileSection() {
        $(".main").append('<section id="profile"></section>');
        $("#profile").append('<img src="Images/pb.jpg" alt="Avatar">');
        $("#profile").append('<p id="name">BENJAMIN<br>PETERHANS</p>');
    }

    function buildIntroductionSection() {
        $(".main").append('<section id="introduction"></section>');
        for (var i = 0; i < webLanguages.length; i++) {
            if (language == webLanguages[i]) {
                $("#introduction").append('<script src="https://gist.github.com/benjyros/28f6d8bf0eb3236fd5f9d93925f91df1.js"></script>');
            }
        }

    }

    function buildSkillsSection() {
        $(".main").append('<section id="skills"></section>');
        buildSkills();
        buildLanguages();
    }

    function buildSkills() {
        $("#skills").append('<div id="skillsContainer"></div>');
        $("#skillsContainer").append('<p>S K I L L S</p>');
        $("#skillsContainer").append('<table id="skillsTable"></table>');

        for (var i = 0; i < skills.length; i++) {
            $("#skillsTable").append(
                '<tr>'
                    + '<td class="label"><label>' + skills[i] + '</label></td>'
                    + '<td><progress value="' + percentages[i] + '" max="100"> ' + percentages[i] + '% </progress></td>'
                + '</tr>'
            );
        }
    }

    function buildLanguages() {
        $("#skills").append('<div class="row" id="languageContainer"></div>');

        for (var i = 0; i < languages.length; i++) {
            $("#languageContainer").append(
                '<div class="bar col-sm">'
                    + '<img src="Images/skills/' + fileNames[i] + '.png" /><br>'
                    + '<span>' + languages[i] + '</span>'
                + '</div>'
            );
        }
    }

    function buildGithubSection() {
        $(".main").append('<section id="githubstats"></section>');
        $("#githubstats").append('<p>G I T H U B &nbsp;S T A T S</p>');
        $("#githubstats").append('<div align="center" id="stats"></div>');
        $("#stats").append('<img style="padding-bottom: 3%" src="https://github-readme-stats.vercel.app/api?username=benjyros&show_icons=true&hide=contribs,prs&cache_seconds=86400&theme=graywhite" /><br>');
        $("#stats").append('<img style="padding-bottom: 3%" src="https://github-readme-stats.vercel.app/api/top-langs/?username=benjyros&layout=compact&theme=graywhite" /><br>');
        $("#stats").append('<a href="https://github.com/benjyros" target="_blank"><img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" /></a>');
    }

});