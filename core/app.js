// Load RSS feed

function load_rss() {

    $.ajax({
            headers: { "Accept": "application/xml"},
            type: 'GET',
            url: 'https://basna.ir/fa/rss/allnews',
            crossDomain: true,
            beforeSend: function(xhr){
                xhr.withCredentials = true;
        },
        success: function(data, textStatus, request){
            var $xml = $(data);
            $xml.find("item").each(function() {
                var $this = $(this),
                    item = {
                        title: $this.find("title").text(),
                        link: $this.find("link").text(),
                        description: $this.find("description").text(),
                        pubDate: $this.find("pubDate").text(),
                        author: $this.find("author").text()
                }
                alert(item);
            });
        }
    });

}

// Load categories

$.get("data/categories.json" , function(data, status){
    data.forEach(obj => {
        $('#categories').append(`
            <a onclick="load_cat(` + obj['id'] + `)" class="list-group-item list-group-item-action">` + obj['title'] + `</a>
        `);
    });
});

function load_cat(id) {
    $.get("data/category_" + id + ".json" , function(data, status){
        $("#items").html('');
        data.forEach(obj => {
            $('#items').append(`
            <tr>
                <th scope="row">` + obj['index'] + `</th>
                <td>
                <a href="#">
                ` + obj['content'] + `
                </a>
                </td>
                <td>
                <a class="btn btn-sm btn-danger my-1 my-sm-0">
                    <span class="fas fa-zoom mr-1"></span>
                    دریافت اطلاعات</a>
                </td>
            </tr>
          `);
        });
    });
}