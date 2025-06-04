import { flightSearchWithDestination } from '../api'
import axios from 'axios'

jest.mock('axios')
jest.mock('expo-constants')

describe('flightSearchWithDestination', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  axios.create.mockReturnValue({
  get: mockGet,
  post: mockPost,
});



  it('resolves with flight data when API calls succeed', () => {
    // Mock token fetch
    axios.post.mockResolvedValueOnce({ data: { access_token: 'mock-token' } })
    // Mock flight offers fetch
    axios.get.mockResolvedValueOnce({ data: { flights: ['flight1', 'flight2'] } })

    const params = {
      originLocationCode: 'BOS',
      destinationLocationCode: 'PAR',
      departureDate: '2025-06-10',
      adults: 1
    }

    // Return the promise so Jest waits for it
    return flightSearchWithDestination(params).then(data => {
      expect(axios.post).toHaveBeenCalledWith(
        'https://test.api.amadeus.com/v1/security/oauth2/token',
        expect.any(URLSearchParams),
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
      )
      expect(axios.get).toHaveBeenCalledWith(
        '/shopping/flight-offers',
        expect.objectContaining({
          headers: { Authorization: 'Bearer mock-token' },
          params
        })
      )
      expect(data).toEqual({ flights: ['flight1', 'flight2'] })
    })
  })

  it('rejects if token fetch fails', () => {
    axios.post.mockRejectedValueOnce(new Error('token error'))

    return flightSearchWithDestination({}).catch(err => {
      expect(err).toBeInstanceOf(Error)
      expect(err.message).toBe('token error')
    })
  })

  it('rejects if flight fetch fails', () => {
    axios.post.mockResolvedValueOnce({ data: { access_token: 'mock-token' } })
    axios.get.mockRejectedValueOnce(new Error('flights error'))

    return flightSearchWithDestination({}).catch(err => {
      expect(err).toBeInstanceOf(Error)
      expect(err.message).toBe('flights error')
    })
  })
})

// Mock expo-constants
// jest.mock('expo-constants', () => ({
//     expoConfig: {
//       extra: {
//         AMADEUS_CLIENT_ID: 'fake-client-id',
//         AMADEUS_CLIENT_SECRET: 'fake-client-secret'
//       }
//     }
//   }))
  
//   describe('flightSearchWithDestination', () => {
//     it('should fetch access token and then return flight offers', async () => {
//       // Mock token response
//       axios.post.mockResolvedValueOnce({
//         data: { access_token: 'fake-token' }
//       })
  
//       // Mock flight search response
//       axios.create = jest.fn(() => axios) // return the mocked axios instance
  
//       axios.get.mockResolvedValueOnce({
//         data: { flights: ['flight1', 'flight2'] }
//       })
  
//       const params = {
//         originLocationCode: 'BOS',
//         destinationLocationCode: 'PAR',
//         departureDate: '2025-06-30',
//         adults: 1
//       }
  
//       const data = await flightSearchWithDestination(params)
  
//       expect(axios.post).toHaveBeenCalledWith(
//         'https://test.api.amadeus.com/v1/security/oauth2/token',
//         expect.anything(),
//         expect.objectContaining({
//           headers: {
//             'Content-Type': 'application/x-www-form-urlencoded'
//           }
//         })
//       )
  
//       expect(axios.get).toHaveBeenCalledWith(
//         '/shopping/flight-offers',
//         expect.objectContaining({
//           headers: { Authorization: 'Bearer fake-token' },
//           params
//         })
//       )
  
//       expect(data).toEqual({ flights: ['flight1', 'flight2'] })
//     })
//   })

