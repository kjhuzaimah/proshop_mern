const request = require('supertest')
const express = require('express')

const app = express()

app.get('/api/test', (req, res) => {
  res.status(200).json({ message: 'API working' })
})

describe('API Test', () => {
  test('GET /api/test should return API working', async () => {
    const res = await request(app).get('/api/test')

    expect(res.statusCode).toBe(200)
    expect(res.body.message).toBe('API working')
  })
})
