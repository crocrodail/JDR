const getAll = async (_req, res) => {

  res.status(200).json({
		status: 200,
		data: "data"
	})
}


module.exports = {
  getAll,
}
