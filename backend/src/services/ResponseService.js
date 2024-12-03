class ResponseService {
  static success(res, msg, obj = null) {
    let date = new Date();
    let time = date.getTime();
    res.status(200).json({ status: 200, time, msg, obj });
  }

  static error(res, msg, obj = null) {
    let date = new Date();
    let time = date.getTime();
    res.status(500).json({ status: 500, time, msg, obj });
  }
}

module.exports = ResponseService;