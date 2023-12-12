let containerElement = $('.container')
const currentDayElement = $('#currentDay')

today = dayjs().format('DD-MMM-YYYY')

// check if there is any localStorage data

const localStorageStoredData = localStorage.getItem('dateInfo')
if (localStorageStoredData !== null) {
	let storedData = JSON.parse(localStorageStoredData)
} else {
	// check if the data is right format to store it into the data
	let localStorageRaw = [
		{
			date: today,
			timeSlot: {
				'9AM': 'Please add your schedule',
				'10AM': 'Please add your schedule',
				'11AM': 'Please add your schedule',
				'12PM': 'Please add your schedule',
				'13PM': 'Please add your schedule',
				'14PM': 'Please add your schedule',
				'15PM': 'Please add your schedule',
				'16PM': 'Please add your schedule',
				'17PM': 'Please add your schedule',
			},
		},
	]
	// set today's data to localstorage if its empty
	let dateInfo = JSON.stringify(localStorageRaw)
	localStorage.setItem('dateInfo', dateInfo)
	console.log('dateInfo is used')
}
// Add the current time to display
currentDayElement.text(today)

let storedData = JSON.parse(localStorageStoredData)

// Get the timeSlot key for looping
let timeSlotIndex = storedData[0].timeSlot
let timeSlotDataString = JSON.stringify(timeSlotIndex)
let timeSlotData = JSON.parse(timeSlotDataString)

// add the timetable blocks
// add the data into the element
// loop the array to create the entire block
for (let key in timeSlotData) {
	let divElement = $(`<div>`)
	divElement.addClass('time-block m-0')
	divElement.attr('id', 'key-' + key)
	let hourElement = $('<div>').text(key)
	hourElement.addClass(
		'row hour col-sm-2 d-flex align-items-center justify-content-center'
	)
	let textareaElement = $(
		'<textarea class="row description col-sm-8"></textarea>'
	).val(timeSlotData[key])
	textareaElement.attr('id', 'timeSlot-' + key)
	let buttonElement = $(
		'<button class="row saveBtn btn col-sm-2 d-flex align-items-center justify-content-center p-0">' +
			'<i class="fas fa-save fa-solid"></i>' +
			'</button>'
	)
	containerElement.append(divElement)
	divElement.append(hourElement)
	divElement.append(textareaElement)
	divElement.append(buttonElement)
}

let buttonElements = document.getElementsByClassName('saveBtn')

// add eventListener to all buttons
for (let i = 0; i < buttonElements.length; i++) {
	buttonElements[i].addEventListener('click', function (event) {
		// when the button is clicked, get the corresponding textareaId and value
		let textareaDiv = event.target.closest('.time-block')
		let textareaElement = textareaDiv.querySelector('textarea')
		let textareaId = textareaElement.id
		let textareaValue = textareaElement.value
		// console.log(textareaId)
		// console.log(textareaValue)

		// store the value to the localStorage
		// extract the hour from textareaID
		let hour = textareaId.split('-')[1]
		// console.log(hour)
		// Update the value for the specific time slot
		storedData[0].timeSlot[hour] = textareaValue
		localStorage.setItem('dateInfo', JSON.stringify(storedData))
		displaySuccess()
		setTimeout(hideSuccess, 2000)
	})
}

function displaySuccess() {
	document.getElementById('successAlert').classList.remove('d-none')
}

function hideSuccess() {
	document.getElementById('successAlert').classList.add('d-none')
}

// Get the current time
let currentHour = dayjs().format('H')
// for debug the time
currentHour = 15
// console.log(currentHour)
// Get the timeSlot value from all hour element
let timeBlockElement = $('.time-block')
for (let i = 0; i < timeBlockElement.length; i++) {
	let block = timeBlockElement[i]
	// split the id key for the usability
	let idParts = timeBlockElement[i].id.split('-')
	let timePart = idParts[1]
	let hourString = timePart.slice(0, -2)
	let blockHour = parseInt(hourString)
	let textareaElement = $(block).find('textarea')
	if (blockHour < currentHour) {
		// if the current time is within the time block, add the present css
		$(textareaElement).addClass('past').removeClass('present future')
	} else if (blockHour === currentHour) {
		// if its before, add past
		$(textareaElement).addClass('present').removeClass('past future')
	} else {
		// then if its in the future, add the future calss
		$(textareaElement).addClass('future').removeClass('past present')
	}
}
