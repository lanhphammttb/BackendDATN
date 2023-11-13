const handleResponse = async (res, successData, message, error) => {
  try {
    if (error) {
      if (error.name === 'ValidationError') {
        let errors = {};
        Object.keys(error.errors).forEach((key) => {
          errors[key] = error.errors[key].message;
        });
        return res.status(400).send({
          data: successData,
          code: error.status,
          error: {
            message: errors,
          },
        });
      }
    } else {
      // Trả về kết quả thành công
      return res.status(200).json({
        data: {
          result: true,
          data: successData,
          message: message,
        },
        error: error,
      });
    }
  } catch (error) {
    // Xử lý lỗi ngoại lệ
    return res.status(500).json({
      success: false,
      error: 'Internal Server Error',
    });
  }
};

module.exports = handleResponse;
