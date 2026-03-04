var all_inventory_sections = document.getElementsByTagName("inventory-section");

for (e of all_inventory_sections)
{
	// console.log(e.getAttribute("content"));
	const content_tokenized = e.hasAttribute("content") ? e.getAttribute("content").split("\n") : [];


	const content_exclude_tokenized = e.hasAttribute("content_exclude") ? e.getAttribute("content_exclude").split("\n") : [];

	const header_tokenized = e.hasAttribute("header") ? e.getAttribute("header").split("_") : [];
	const parser_tokenized = e.hasAttribute("parser") ? e.getAttribute("parser").split("_") : [];

	const emptyrows = e.hasAttribute("emptyrows") ? e.getAttribute("emptyrows") : 0;
	const rowheight = e.hasAttribute("height") ? e.getAttribute("height") : "low";

	// create the header
	for (h of header_tokenized)
	{
		item = document.createElement("shaded-text");
		item.innerHTML = h;
		e.appendChild(item);
	}

	// set the column width and count
	style_string = "";
	for (h of header_tokenized)
	{
		switch (h)
		{
			case "ITEM": style_string += "1fr "; break;
			case "PLACE": style_string += "minmax(15mm, max-content) "; break;
			default: style_string += "minmax(7mm, max-content) "; break;
		}					
	}
	e.style["grid-template-columns"] = style_string;


	// set the row spacing according to height
	switch (rowheight)
	{
		case "low":
			e.style["grid-row-gap"] = "0.5mm";
			break;
		case "high":
			e.style["grid-row-gap"] = "1.6mm";
			break;
	}
	


	// set the content
	// ignore the first enter
	for (var i=1; i < content_tokenized.length; i += parser_tokenized.length)
	{
		if (content_exclude_tokenized.includes(content_tokenized[i+parser_tokenized.indexOf("ITEM")]))
			continue;


		for (h of header_tokenized)
		{
			var item;
			switch (h)
			{
				case "ATTUNED":
					item = document.createElement("checkbox-circle");
					break;

				default:
					item = document.createElement("text-underscore");
					break;
			}

			if (parser_tokenized.includes(h))
				item.innerHTML = content_tokenized[i+parser_tokenized.indexOf(h)];

			e.appendChild(item);
		}
	}


	for (var i=0; i < emptyrows; i++)
	{
		for (h of header_tokenized)
		{
			var item;
			switch (h)
			{
				case "ATTUNED":
					item = document.createElement("checkbox-circle");
					break;

				default:
					item = document.createElement("text-underscore");
					break;
			}
			e.appendChild(item);
		}
	}
}





// get all inventory-line elements
var all_inventory_line_elements = document.getElementsByTagName("inventory-line");

for (e of all_inventory_line_elements)
{
	// console.log(e.getAttribute("content"));

	if (!e.hasAttribute("content"))
		continue;

	const content_tokenized = e.getAttribute("content").split("_");

	// set the correct spacings for the type of inventory line
	switch(content_tokenized.length)
	{
		case 3:
			e.style["grid-template-columns"] = "10mm 1fr max-content";
			break;

		case 4:
			e.style["grid-template-columns"] = "10mm 1fr 11mm 8mm";
			break;

		case 5:
			e.style["grid-template-columns"] = "10mm 10mm 1fr 11mm 8mm";
			break;

		case 6:
			e.style["grid-template-columns"] = "10mm 10mm 11mm 1fr 11mm 8mm";
			break;
	}


	for (token of content_tokenized)
	{
		var element;
		if (token.includes("<") && token.includes(">"))
		{
			// console.log(token);
			switch (token) {
				case "<checkbox-circle>":
					element = document.createElement("checkbox-circle");
					// console.log("added");
					break;
			}
		}
		else
		{
			if (e.getAttribute("header"))
				element = document.createElement("shaded-text");
			else
				element = document.createElement("text-underscore");

			element.innerHTML = token;
		}
		
		// console.log(token);
		e.appendChild(element);
	}
}