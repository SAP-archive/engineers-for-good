# Manage Newsletters at Good Market

## Architecture
### Newsletter API
The Newsletter API serves as an interface between the UI and the backend. 
#### Entities
Following entities are exposed.
![Entities that are exposed by the newsletter api](./newsletter-api-entities.jpg)

The Newsletter API allows following operations on the entities.
| Entity | Operations |
|--- | --- |
| MarketplaceListing | GET, POST |
| MarketplaceListingImage | GET, POST |
| Enterprise | GET, POST | 
| EnterpriseImage | GET, POST |
| SpotlightArticle | GET, POST |
| Region | GET, POST |
| EmailText | GET, POST | 
| Region | GET, POST |
| EmailAddress | <span style="color:red"> (TODO: GET required?), </span> POST |
