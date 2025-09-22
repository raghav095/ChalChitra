router.get('/', async (req, res) => {
  try {
    
    const moviesCollection = req.app.locals.db.collection('movies');
    const allMovies = await moviesCollection.find({}).toArray();
    res.json(allMovies);
  } catch (error) {
    console.error("Error fetching movies from DB:", error);
    res.status(500).json({ message: "Error fetching movies" });
  }
});

export default router;