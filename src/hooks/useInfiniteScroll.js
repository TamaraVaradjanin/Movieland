import { useEffect, useRef } from 'react'
import { useMovies } from './useMovies'

export const useInfiniteScroll = (refTarget, fetchItems) => {
  const observer = useRef(null)
  const { loading, page, totalPages } = useMovies()

  useEffect(() => {
    const currentRef = refTarget.current
    const observer = new IntersectionObserver((entries) => {
      const target = entries[0]
      if (target.isIntersecting && !loading && page < totalPages) {
        fetchItems()
      }
    })

    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [fetchItems, refTarget])

  return observer
}
