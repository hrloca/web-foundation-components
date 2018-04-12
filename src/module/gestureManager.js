const getPage = (page, event) => (event.changedTouches ? event.changedTouches[0][page] : event[page])

const getTriangleSide = (x1, y1, x2, y2) => {
  const x = x2 - x1
  const y = y2 - y1
  const z = Math.sqrt(Math.abs(x) ** 2 + Math.abs(y) ** 2)
  return { x, y, z }
}

const getAngle = (triangle) => {
  const cos = Math.abs(triangle.y) / triangle.z
  const radian = Math.acos(cos)
  return 180 / (Math.PI / radian)
}

export default class GestureManager {
  constructor(opt) {
    this.DISTANCE_THRESHOLD = opt.DISTANCE_THRESHOLD || 5
    this.ANGLE_THREHOLD = opt.ANGLE_THREHOLD || 60
    this.LIMIT_THRESHOLD = opt.LIMIT_THRESHOLD || 18
    this.RELEASE_THRESHOLD = opt.RELEASE_THRESHOLD || 3

    this.onGrab = opt.onGrab
    this.onGrabOnce = opt.onGrabOnce
    this.onSwipeUp = opt.onSwipeUp
    this.onSwipeDown = opt.onSwipeDown
    this.onSwipeRight = opt.onSwipeRight
    this.onSwipeLeft = opt.onSwipeLeft
    this.onSwipeUpReleased = opt.onSwipeUpReleased
    this.onSwipeDownReleased = opt.onSwipeDownReleased
    this.onSwipeRightReleased = opt.onSwipeRightReleased
    this.onSwipeLeftReleased = opt.onSwipeLeftReleased
    this.useSwipeX = opt.useSwipeX
    this.useSwipeY = opt.useSwipeY
    this.init()
  }

  init() {
    this.isGrab = false
    this.isLock = false
    this.isSwipingX = false
    this.isSwipingY = false
    this.isOverX = false
    this.isOverY = false
    this.isSwipedX = false
    this.isSwipedY = false
    this.increaseX = false
    this.increaseY = false
    this.X = 0
    this.Y = 0
  }

  start(e) {
    this.startPageX = getPage('pageX', e)
    this.startPageY = getPage('pageY', e)
    this.isStart = true
    this.init()
  }

  end() {
    if (this.isOverX) {
      if (this.maxX < Math.abs(this.X) + this.RELEASE_THRESHOLD) {
        if (this.X > 0) {
          this.onSwipeRightReleased()
        } else {
          this.onSwipeLeftReleased()
        }
      }
    }

    if (this.isOverY) {
      if (this.maxY < Math.abs(this.Y) + this.RELEASE_THRESHOLD) {
        if (this.Y < 0) {
          this.onSwipeUpReleased()
        } else {
          this.onSwipeDownReleased()
        }
      }
    }

    this.isStart = false
    this.init()
  }

  move(e) {
    const pageX = getPage('pageX', e)
    const pageY = getPage('pageY', e)
    const triangle = getTriangleSide(this.startPageX, this.startPageY, pageX, pageY)
    const angle = getAngle(triangle)

    if (this.isGrab || triangle.z > this.DISTANCE_THRESHOLD) {
      // Grabing
      if (!this.isLock) {
        this.isLock = true
        if (this.useSwipeX && angle > this.ANGLE_THREHOLD) {
          this.isSwipingX = true
          this.isGrab = true
          if (this.onGrabOnce) this.onGrabOnce(triangle.x, triangle.y)
        } else if (this.useSwipeY && angle < 90 - this.ANGLE_THREHOLD) {
          this.isSwipingY = true
          this.isGrab = true
          if (this.onGrabOnce) this.onGrabOnce(triangle.x, triangle.y)
        } else {
          this.isGrab = false
        }
      }

      // Grabing
      if (this.isGrab) {
        // Swiping X
        if (this.onGrab) this.onGrab({ x: triangle.x, y: triangle.y })

        if (this.useSwipeX && this.isSwipingX) {
          e.preventDefault()
          const nextX = triangle.x
          this.isOverX = false
          if (this.LIMIT_THRESHOLD < Math.abs(nextX)) {
            const diff = Math.abs(nextX) - Math.abs(this.X)
            this.increaseX = diff > 0
            if (this.increaseX) this.maxX = Math.abs(nextX)
            this.isOverX = true
            if (!this.isSwipedX) {
              this.isSwipedX = true
              if (nextX > 0) {
                this.onSwipeRight()
              } else {
                this.onSwipeLeft()
              }
            }
          }
          this.X = nextX
        }

        // Swiping Y
        if (this.useSwipeY && this.isSwipingY) {
          e.preventDefault()
          const nextY = triangle.y
          this.isOverY = false
          if (this.LIMIT_THRESHOLD < Math.abs(nextY)) {
            const diff = Math.abs(nextY) - Math.abs(this.Y)
            this.increaseY = diff > 0
            if (this.increaseY) this.maxY = Math.abs(nextY)
            this.isOverY = true
            if (!this.isSwipedY) {
              this.isSwipedY = true
              if (nextY > 0) {
                this.onSwipeDown()
              } else {
                this.onSwipeUp()
              }
            }
          }
          this.Y = nextY
        }
      }
    }
  }
}
