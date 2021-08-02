const returnThis = () => {
  console.log(this);
}

returnThis()

//console.log(returnThis())

/*
const train = {
  trainName: 'JR',
  destination: 'Shibuya',
  data: [],
  printTrain(carNum, name) {
    console.log(
      ` ${name} takes a train on ${this.trainName}.\n`,
      `Bound for ${this.destination}.\n`,
      `Car number is ${carNum}`
    );
    this.data.push({ TrainNumber: `${this.trainName}${carNum}`, name });
  },
};

const printTrain = train.printTrain;

printTrain.call(train, 23, 'kewnto')
*/