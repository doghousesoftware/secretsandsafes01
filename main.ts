radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 0) {
        safeState = 0
        pins.servoWritePin(AnalogPin.P1, 0)
    } else {
        safeState = 1
        pins.servoWritePin(AnalogPin.P1, 180)
    }
})
input.onButtonPressed(Button.A, function () {
    basic.showString("Armed")
    radio.sendNumber(1)
    basic.showIcon(IconNames.TShirt)
})
input.onButtonPressed(Button.B, function () {
    basic.showString("Safe")
    radio.sendNumber(0)
    basic.showIcon(IconNames.Square)
})
let safeState = 0
radio.setGroup(1)
basic.forever(function () {
    if (safeState == 1) {
        // System has not been compromised so all is well - do nothing
        // System is compromised so need to alert!
        if (input.pinIsPressed(TouchPin.P0)) {
            music.playMelody("C - - - - - - - ", 120)
        } else {
            while (true) {
                basic.showLeds(`
                    . . . . .
                    . . . . .
                    # . # . .
                    . . . . .
                    . . . . .
                    `)
                basic.pause(100)
                basic.showLeds(`
                    . . . . .
                    . . . . .
                    . . # . #
                    . . . . .
                    . . . . .
                    `)
                basic.pause(100)
                basic.clearScreen()
            }
        }
    } else {
        basic.clearScreen()
    }
})
