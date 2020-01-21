$(document).ready(function() {

	let quotes;
	let fetched = false;

	function setQuote() {
		const quote = quotes[Math.floor(Math.random() * quotes.length)];
		if (quote.author === null) {
			quote.author = "Unnamed Author";
		}
		$("#tweet-quote").attr("href", "https://twitter.com/intent/tweet?&text=" + encodeURIComponent(`"${quote.text}" - ${quote.author}`));
		$("#tumblr-quote").attr("href", "http://tumblr.com/widgets/share/tool?posttype=quote&content=" + encodeURIComponent(quote.text) + "&caption=" + encodeURIComponent(quote.author) + "&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button");
		setText(quote.text, quote.author);
	};

	function setText(text, author) {
		$("#box-bottom").animate({opacity: 0}, 250, function() {
			$("#text").text(text);
			$("#author").text(author);
			$(this).animate({opacity: 1}, 250)
		});
	}

	function getQuotes() {
		$.ajax({
			async: true,
			crossDomain: true,
			method: "GET",
			url: "https://type.fit/api/quotes",
			success: function(response) {
				quotes = JSON.parse(response);
				fetched = true;
				setQuote();
			},
			error: function() {
				setText("Unable to retrieve quotes.", "Please try again later");
			}
		});
	}

	$("#new-quote").click(function(event) {
		event.preventDefault();
		fetched ? setQuote() : getQuotes();
	});

	getQuotes();
});