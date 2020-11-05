radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 0) {
        basic.clearScreen()
        // disarm the safe
        safeState = 0
        opened = 0
        pins.servoWritePin(AnalogPin.P1, 0)
    } else {
        // arm the safe
        safeState = 1
    }
})
input.onButtonPressed(Button.A, function () {
    // disarm the safe
    radio.sendNumber(0)
    basic.showString("OFF")
    basic.showIcon(IconNames.Square)
})
input.onButtonPressed(Button.B, function () {
    // arm the safe
    radio.sendNumber(1)
    basic.showString("Armed")
    basic.showIcon(IconNames.TShirt)
})
let opened = 0
let safeState = 0
radio.setGroup(1)
basic.forever(function () {
    while (safeState == 1) {
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
        // System has not been compromised so all is well - do nothing
        if (pins.digitalReadPin(DigitalPin.P0) == 1) {
            // System is compromised so need to alert!
            safeState = 0
            basic.showIcon(IconNames.No)
            // System is compromised so need to alert!
            opened = 1
            // Safe is opened - write to server to show broken flag
            pins.servoWritePin(AnalogPin.P1, 180)
            // arm the safe
            radio.sendNumber(2)
        }
    }
})
