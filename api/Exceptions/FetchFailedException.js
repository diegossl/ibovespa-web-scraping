'use strict'

class FetchFailedException {

  handle (response) {
    response.status(500).send({ message: message })
  }

}

export default FetchFailedException