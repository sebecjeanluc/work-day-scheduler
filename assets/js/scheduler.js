let containerElement = $('.container')
const currentDayElement = $('#currentDay')

today = dayjs().format('DD-MMM-YYYY')
// check if the data is right format to store it into the data
let localStorageData = [
	{
		date: today,
		timeSlot: {
			9: 'test',
			10: 'test',
			11: 'test',
			12: 'test',
			13: 'test',
			14: 'test',
			15: 'test',
			16: 'test',
			17: 'test',
		},
	},
]
currentDayElement.text(today)

// add the timetable blocks
// get data from the array
let timeSlotIndex = localStorageData[0].timeSlot
// add the data into the element
// loop the array to create the entire block

let timeSlotDataString = JSON.stringify(timeSlotIndex)
let timeSlotData = JSON.parse(timeSlotDataString)

console.log(timeSlotData)

for (let key in timeSlotData) {
	console.log(key)
}
let timeSlotKeys = Object.keys(timeSlotIndex)
let timeSlotValus = Object.values(timeSlotIndex)

console.log(JSON.parsetimeSlotIndex)
// console.log(timeSlotValus)
for (let i = 0; i < timeSlotIndex.length; i++) {
	console.log(timeSlotIndex[i])
}
for (let i = 0; i < timeSlotKeys.length; i++) {
	let divElement = $(`<div>`)
	let hourElement = $('<div>').text(timeSlotKeys[i] + ':00')
	let textareaElement = $(
		'<textarea class="row description col-sm-8"></textarea>'
	).val(timeSlotKeys[i])
	let buttonElement = $(
		'<button class="row saveBtn btn col-sm-2 d-flex align-items-center justify-content-center p-0">' +
			'<i class="fas fa-save fa-solid"></i>' +
			'</button>'
	)
	divElement.addClass('time-block row')
	hourElement.addClass(
		'row hour col-sm-2 d-flex align-items-center justify-content-center'
	)
	containerElement.append(divElement)
	divElement.append(hourElement)
	divElement.append(textareaElement)
	divElement.append(buttonElement)
}

// set today's data to localstorage
// localStorage.setItem('date', )

// populating today's data from local storage for different date
// const todayDataIndex = localStorageData.findIndex(function (element) {
// 	return element.date === today
// })

// if (todayDataIndex < 0) {
// 	const todayData = localStorageData[todayDataIndex]

// 	for (let i = 9; i < 18; i++) {
// 		document.getElementById('time-block-' + i).value = todayData.data[i]
// 	}
// }

// click btn to save the data to localstorage
// click event listner
// get the value of the textarea that correspond with btn that user click
// if todayDataIndex exist
// const todayData = localStorageData[todayDataIndex]
// todayData.data[time] = value of the textarea
// localStorageData[todayDataIndex] = todayData
// localoStorage.setItem('data', localStorageData)
// else const todayData = { date: "10-12-2023", data:{}
// todayData.data[time] = value of the textarea
// localStorageData[todayDataIndex] = todayData
// localoStorage.setItem('data', localStorageData)
//}
