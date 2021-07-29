

const resultContainer = document.querySelector('.results');
// Hide the results container 
resultContainer.classList.add('hide');

const checkScoreButton = document.querySelector('.check button');
const fullName = document.querySelector('.element .name');
const age = document.querySelector('.element .year');
const studies = document.querySelector('.element .studies');
const salary = document.querySelector('.element .salary');
const experience = document.querySelector('.element .experience');
const sum = document.querySelector('.element .sum');
const locative = document.querySelector('.element .locative');
const civile = document.querySelector('.element .civile');
const children = document.querySelector('.element .children');
const duration = document.querySelector('.element .duration');

const allElements = document.querySelectorAll('.element input');

const totalScoreElement = document.querySelector('.content .score_container .score');
const percentElement = document.querySelector('.content .circle .percent');

const resultTitle = document.querySelector('.results .title');

const failMessage = document.querySelector('.fail');

// Statistics elements

const compares = document.querySelectorAll('.statistics .compare');


// Button click event
checkScoreButton.addEventListener('click', () => {

    

    let emptyElements = [...allElements].some(element => {
        return element.value === "";
    });

    if (emptyElements) {
        failMessage.innerHTML = "Trebuie sa completezi toate campurile.<br>";
        return;
    } else {
        failMessage.innerHTML = "";
    }

    // The selected values of elements
    const nameValue = fullName.value;
    const ageValue = age.value;
    const studiesValue = studies[studies.selectedIndex].innerText;
    const salaryValue = salary.value;
    const experienceValue = experience.value;
    const sumValue = sum.value;
    const locativeValue = locative[locative.selectedIndex].innerText;
    const civileValue = civile[civile.selectedIndex].innerText;
    const childrenValue = children.value;
    const durationValue = duration.value;

    let reason, totalScore = 0, lost = false, maxScore = 0, percentageCompare = [], currentPercent, resultsCompare = [], maxResultsCompare = [];
    const MIN_AGE = 17;
    const MAX_AGE = 61;

    if (parseInt(ageValue) > MIN_AGE && parseInt(ageValue) < MAX_AGE) {
        let currentScore;
        if (parseInt(ageValue) <= 39) currentScore = parseInt(ageValue) - MIN_AGE;
        else if (parseInt(ageValue) > 39) currentScore = MAX_AGE - parseInt(ageValue);
        totalScore += currentScore;
        let currentMaxScore = 39 - MIN_AGE;
        currentPercent = getPercent(currentScore, currentMaxScore);
        percentageCompare.push(currentPercent);
        resultsCompare.push(currentScore);
        maxResultsCompare.push(currentMaxScore);
        maxScore += currentMaxScore;
    } else {
        reason += "age ";
    }

    oldTotalScore = totalScore;

    if (studiesValue === "Gimnazial") totalScore += 5;
    else if (studiesValue === "Liceal") totalScore += 10;
    else if (studiesValue === "Licenta") totalScore += 15;
    else if (studiesValue === "Master") totalScore += 20;
    else reason += "studies ";

    maxScore += 20;
    
    currentPercent = getPercent(totalScore - oldTotalScore, 20);
    percentageCompare.push(currentPercent);
    resultsCompare.push(totalScore - oldTotalScore);
    maxResultsCompare.push(20);

    const MIN_SALARY = 1300;
    const CHILD_COST = 400;

    if (parseInt(salaryValue) >= MIN_SALARY) {
        let currentScore = Math.floor(parseInt(salaryValue) / 100);
        if (currentScore > 60) currentScore = 60;
        maxScore += 60;
        
        currentPercent = getPercent(currentScore, 60);
        percentageCompare.push(currentPercent);
        totalScore += currentScore;
        resultsCompare.push(currentScore);
        maxResultsCompare.push(60);
    } else reason += "salary ";

    if (parseInt(experienceValue) >= 0) {
        let currentScore = parseInt(experienceValue);
        if (currentScore > 10) currentScore = 10;
        totalScore += currentScore;
        maxScore += 10;
        currentPercent = getPercent(currentScore, 10);
        percentageCompare.push(currentPercent);
        resultsCompare.push(currentScore);
        maxResultsCompare.push(10);
    } else reason += "experience ";

    oldScore = totalScore;
    if (locativeValue === "Locuinta cu parintii") totalScore += 5;
    if (locativeValue === "Locuinta proprie") totalScore += 10;
    maxScore += 10;
    currentPercent = getPercent(totalScore - oldScore, 10);
    percentageCompare.push(currentPercent);
    resultsCompare.push(totalScore - oldScore);
    maxResultsCompare.push(10);
    oldScore = totalScore;
    if (civileValue === "Casatorit") totalScore += 5;

    currentPercent = getPercent(totalScore - oldScore, 5);
    percentageCompare.push(currentPercent);
    resultsCompare.push(totalScore - oldScore);
    maxResultsCompare.push(5);
    maxScore += 5;


    if (childrenValue >= 0) {
        let currentScore = childrenValue * (-4);
        totalScore += currentScore;
    } else {
        reason += "children ";
    }

    const sumPerYear = Math.floor(parseInt(sumValue) / ((parseInt(durationValue)) / 12));
    
    const yearSalary = parseInt(salaryValue) * 12;
    
    if (sumPerYear > (40 * yearSalary) / 100) {
        reason += "sum ";
    } else {
        oldScore = totalScore;
        for (let percent = 40; percent > 0; percent--) {
            if (sumPerYear > (percent * yearSalary) / 100) break;
            else 
                totalScore += 1;        
            console.log ('percent')
        }
    }

    currentPercent = getPercent(totalScore - oldScore, 40);
    percentageCompare.push(currentPercent);
    resultsCompare.push(totalScore - oldScore);
    maxResultsCompare.push(40);
    maxScore += 40;
    
    console.log(maxScore);

    totalScoreElement.innerText = totalScore;
    
    const percentage  = (totalScore / maxScore) * 100;

    percentElement.innerText = `${percentage % 1 != 0 ? parseFloat(percentage).toFixed(2) : percentage}%`;

    if (percentage >= 60) {
        resultTitle.innerText = "Ai reusit!🙂";
    } else {
        resultTitle.innerText = "Nu ai resuit!😔";
        resultTitle.classList.add('fail');
    }

    resultContainer.classList.remove('hide');

    compares.forEach((compare, index) => {
        const personal = compare.querySelector('.progress');
        const max = compare.querySelector('.bar');
        const percent = compare.querySelector('.percent');
        const titleContent = compare.querySelector('.title_content');
        // personal.innerText = resultsCompare[index];
        // max.innerText = maxResultsCompare[index];
        
        if (percentageCompare[index] !== 0) percent.innerText = `${percentageCompare[index] % 1 != 0 ? parseFloat(percentageCompare[index]).toFixed(2) : percentageCompare[index]}%`;
        else percent.innerText = "0%";
        personal.style.width = `${percentageCompare[index]}%`;
        percent.style.marginLeft = `${percentageCompare[index] - 5 < 0 ? "0" : percentageCompare[index] - 5}%`;
        titleContent.innerHTML += ` - <span class="points">${resultsCompare[index]} puncte</span>`;
        if (percentageCompare[index] < 30) {
            personal.classList.add("low_score");
            personal.classList.remove("medium_score");
        } else if (percentageCompare[index] < 60)  {
            personal.classList.add("medium_score");
            personal.classList.remove("low_score");
        } else {

        }

    
    });


});

const getPercent = (x, y) => {
    return (x / y) * 100;
};

// // Statistics

// /* Chart code */
// // Themes begin
// am4core.useTheme(am4themes_animated);
// // Themes end

// let chart = am4core.create("chartdiv", am4charts.PieChart);
// chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

// chart.data = [
//   {
//     country: "Lithuania",
//     value: 401
//   },
//   {
//     country: "Czech Republic",
//     value: 300
//   },
//   {
//     country: "Ireland",
//     value: 200
//   },
//   {
//     country: "Germany",
//     value: 165
//   },
//   {
//     country: "Australia",
//     value: 139
//   },
//   {
//     country: "Austria",
//     value: 128
//   }
// ];
// chart.radius = am4core.percent(70);
// chart.innerRadius = am4core.percent(40);
// chart.startAngle = 180;
// chart.endAngle = 360;  

// let series = chart.series.push(new am4charts.PieSeries());
// series.dataFields.value = "value";
// series.dataFields.category = "country";

// series.slices.template.cornerRadius = 10;
// series.slices.template.innerCornerRadius = 7;
// series.slices.template.draggable = true;
// series.slices.template.inert = true;
// series.alignLabels = false;

// series.hiddenState.properties.startAngle = 90;
// series.hiddenState.properties.endAngle = 90;



