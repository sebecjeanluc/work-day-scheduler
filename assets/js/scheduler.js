let containerElement = $('.container')
const currentDayElement = $('#currentDay')

// Format and display the current date
today = dayjs().format('DD-MMM-YYYY')
currentDayElement.text(today)

// Initialize a variable to store schedule data
let storedData

// Try to load existing schedule data from localStorage
const localStorageStoredData = localStorage.getItem('dateInfo')
if (localStorageStoredData !== null) {
	storedData = JSON.parse(localStorageStoredData)
	createTimeBlock()
} else {
	// If no data in localStorage, initialize default schedule data
	storedData = [
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
	// Save the initialized schedule data to localStorage
	let dateInfo = JSON.stringify(storedData)
	localStorage.setItem('dateInfo', dateInfo)
	createTimeBlock()
}

// Function to create time block elements
function createTimeBlock() {
	let timeSlotIndex = storedData[0].timeSlot

	for (let key in timeSlotIndex) {
		// Create time block elements
		let divElement = $(`<div>`)
		divElement.addClass('time-block m-0')
		divElement.attr('id', 'key-' + key)
		let hourElement = $('<div>').text(key)
		hourElement.addClass(
			'row hour col-sm-2 d-flex align-items-center justify-content-center'
		)
		let textareaElement = $(
			'<textarea class="row description col-sm-8"></textarea>'
		).val(timeSlotIndex[key])
		textareaElement.attr('id', 'timeSlot-' + key)
		let buttonElement = $(
			'<button class="row saveBtn btn col-sm-2 d-flex align-items-center justify-content-center p-0">' +
				'<i class="fas fa-save fa-solid"></i>' +
				'</button>'
		)
		containerElement.append(divElement)
		divElement.append(hourElement, textareaElement, buttonElement)
	}
	addSaveButton()
}

function addSaveButton() {
	$('.saveBtn').on('click', function (event) {
		const textareaElement = $(event.target)
			.closest('.time-block')
			.find('textarea')
		const hour = textareaElement.attr('id').split('-')[1]
		const updatedText = textareaElement.val()
		// Update schedule data and save to localStorage
		storedData[0].timeSlot[hour] = updatedText
		localStorage.setItem('dateInfo', JSON.stringify(storedData))

		// Display success message
		displaySuccess()
		setTimeout(hideSuccess, 2000)
	})
}

// let buttonElements = document.getElementsByClassName('saveBtn')

// add eventListener to all buttons
// for (let i = 0; i < buttonElements.length; i++) {
// 	buttonElements[i].addEventListener('click', function (event) {
// 		// when the button is clicked, get the corresponding textareaId and value
// 		let textareaDiv = event.target.closest('.time-block')
// 		let textareaElement = textareaDiv.querySelector('textarea')
// 		let textareaId = textareaElement.id
// 		let textareaValue = textareaElement.value
// 		// console.log(textareaId)
// 		// console.log(textareaValue)

// 		// store the value to the localStorage
// 		// extract the hour from textareaID
// 		let hour = textareaId.split('-')[1]
// 		// console.log(hour)
// 		// Update the value for the specific time slot
// 		storedData[0].timeSlot[hour] = textareaValue
// 		localStorage.setItem('dateInfo', JSON.stringify(storedData))
// 		displaySuccess()
// 		setTimeout(hideSuccess, 2000)
// 	})
// }

function displaySuccess() {
	document.getElementById('successAlert').classList.remove('d-none')
}

function hideSuccess() {
	document.getElementById('successAlert').classList.add('d-none')
}

function updateBlockStyles() {
	// Get the current time
	let currentHour = dayjs().format('H')
	// for debug the time
	// currentHour = 16
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
}

updateBlockStyles()
