import React, { useEffect, useState, createContext } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'

export const RoomContex = createContext()

export const RoomContexProvider = ({ children }) => {
  const [rooms, setRooms] = useState([])
  const [hasMore, setHasMore] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)

  const fetchHomestay = async (category = 'all', isLoadMore = false) => {
    if (loading || loadingMore) return;

    try {
      if (isLoadMore) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }

      let url = `${backendUrl}/api/homestay/list?category=${category}&limit=4`

      if (isLoadMore && rooms.length > 0) {
        const lastRoom = rooms[rooms.length - 1];
        url += `&lastId=${lastRoom._id}`;
      }

      const response = await axios.get(url);
      const newHomestays = response.data.homestays || [];

      if (isLoadMore) {
        setRooms(prevRooms => [...prevRooms, ...newHomestays]);
      } else {
        setRooms(newHomestays);
      }

      setHasMore(response.data.hasMore);

    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }

  useEffect(() => {
    fetchHomestay()
  }, [])

  return (
    <RoomContex.Provider value={{ rooms, hasMore, fetchHomestay, loading, loadingMore }}>
      {children}
    </RoomContex.Provider>
  )
}