## Deliverables
- [x] See all ramen images
    - [x] fetch ramen
    - [x] iterate ramen
    - [x] create img elements
    - [x] add to DOM
- [x] Click an image and see details
- [x] Submit a form to create a new ramen in menu (no persistence)

### Bonus
- [] see details for `ramen/1` on page load
- [] update rating and comment with an edit form (no persitence)
- [] delete a ramen from menu; should not display in details

## Data
```javascript
{
      "id": 1,
      "name": "Shoyu Ramen",
      "restaurant": "Nonono",
      "image": "./assets/ramen/shoyu.jpg",
      "rating": 7,
      "comment": "Delish. Can't go wrong with a classic!"
}
```

## Endpoints
base:  http://localhost:3000
GET /ramens
GET /ramens/:id