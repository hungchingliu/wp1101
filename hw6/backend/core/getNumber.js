var number = 0

export const getNumber = () => {
    return number
}

export const genNumber = () => {
    number = Math.floor(Math.random() * 100) 
    console.log(number)
}