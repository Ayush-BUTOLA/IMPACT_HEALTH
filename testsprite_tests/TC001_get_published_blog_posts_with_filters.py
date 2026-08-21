import requests

BASE_URL = "http://localhost:8080"
TIMEOUT = 30

def test_get_published_blog_posts_with_filters():
    url = f"{BASE_URL}/api/public/blogs"
    params = {
        "page": 0,
        "size": 10,
        "search": "health",
        "category": 1
    }
    try:
        response = requests.get(url, params=params, timeout=TIMEOUT)
    except requests.RequestException as e:
        assert False, f"Request to {url} failed: {str(e)}"

    assert response.status_code == 200, f"Expected status code 200, got {response.status_code}"

    try:
        body = response.json()
    except ValueError:
        assert False, "Response is not valid JSON"

    # Validate presence of pagination metadata
    assert "content" in body, "Response JSON missing 'content' field"
    assert "pageable" in body, "Response JSON missing 'pageable' field"
    assert "totalPages" in body, "Response JSON missing 'totalPages' field"
    assert "totalElements" in body, "Response JSON missing 'totalElements' field"
    assert "size" in body, "Response JSON missing 'size' field"
    assert "number" in body, "Response JSON missing 'number' field"

    # Validate that page & size metadata match the request params
    assert body.get("size") == params["size"], f"Expected page size {params['size']}, got {body.get('size')}"
    assert body.get("number") == params["page"], f"Expected page number {params['page']}, got {body.get('number')}"

    # Validate that all blogs in content list have status "PUBLISHED"
    content = body.get("content", [])
    for blog in content:
        status = blog.get("status")
        assert status == "PUBLISHED", f"Found blog with status '{status}', expected 'PUBLISHED'"

    # Optionally check that if category filter was specified, all blogs belong to that category
    for blog in content:
        category = blog.get("category")
        if category and isinstance(category, dict):
            category_id = category.get("id")
            if params.get("category") is not None:
                assert category_id == params["category"], \
                    f"Blog category id {category_id} does not match filter {params['category']}"

test_get_published_blog_posts_with_filters()