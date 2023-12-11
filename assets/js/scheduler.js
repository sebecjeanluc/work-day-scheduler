let containerElement = $('.container')
const currentDayElement = $('#currentDay')

today = dayjs().format('DD-MMM-YYYY')
// check if the data is right format to store it into the data
let localStorageRaw = [
	{
		date: today,
		timeSlot: {
			9: 'test9',
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
let timeSlotIndex = localStorageRaw[0].timeSlot
// add the data into the element
// loop the array to create the entire block

let timeSlotDataString = JSON.stringify(timeSlotIndex)
let timeSlotData = JSON.parse(timeSlotDataString)

for (let key in timeSlotData) {
	let divElement = $(`<div>`)
	let hourElement = $('<div>').text(key + ':00')
	let textareaElement = $(
		'<textarea class="row description col-sm-8"></textarea>'
	).val(timeSlotData[key])
	textareaElement.attr('id', 'timeSlot-' + key)
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
console.log(localStorageRaw)
let dateInfo = JSON.stringify(localStorageRaw)
localStorage.setItem('dateInfo', dateInfo)

// check if you can get the localstorage
let localStorageDateInfo = localStorage.getItem('dateInfo')
let localStorageData = JSON.parse(localStorageDateInfo)
// console.log(localStorageData[0].date) //date
// console.log(localStorageData[0].timeSlot[9]) // textarea
for (i = 0; i < localStorageData.length; i++) {
	let timeSlot = Object.values(localStorageData[i].timeSlot)
	for (let j = 0; j < timeSlot.length; j++) {
		console.log(timeSlot[j])
	}
}

let textareaId = document.getElementById('timeSlot-9')
localStorageData[0].timeSlot['9'] = textareaId.value

let buttonElements = document.getElementsByClassName('saveBtn')

for (let i = 0; i < buttonElements.length; i++) {
	buttonElements[i].addEventListener('click', function (event) {
		console.log('clicked', textareaId.value)
	})
}

// update the data
localStorage.setItem('dateInfo', JSON.stringify(localStorageData))

// producing today's data from local storage for different date
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
