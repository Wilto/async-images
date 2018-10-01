(function() {
	function loadAsync() {
		var lazyimgs = document.querySelectorAll( '[data-lazy]' ),
			attrswap = function( img ) {
				var srcset = img.getAttribute( 'data-srcset' ),
					sizes = img.getAttribute( 'data-sizes' );

				img.setAttribute( "src", img.getAttribute( 'data-src' ) );

				srcset && img.setAttribute( "srcset", srcset );
				sizes && img.setAttribute( "sizes", sizes );
			},
			supports = "IntersectionObserver" in window 
					&& "IntersectionObserverEntry" in window 
					&& "intersectionRatio" in window.IntersectionObserverEntry.prototype,
			opts = {
				root: document.querySelector( '.carousel-view' ),
				threshold: 0.0001
			};

		if( supports ) {
			var imgObs = new IntersectionObserver( function( els ) {
				els.forEach( function( el ) {
					console.log( el.intersectionRatio );
					if( el.intersectionRatio > 0 ) {
						var img = el.target;

						attrswap( img );
						imgObs.unobserve( img );
					}
				});
			}, opts );

			console.log( opts );

			[].slice.call( lazyimgs ).forEach(function(lazyimg) {
				imgObs.observe( lazyimg );
			});
		} else {
			for( i = 0; i < lazyimgs.length; i++ ){
				attrswap( lazyimgs[ i ] );
			}
		}
	};

	document.addEventListener( "DOMContentLoaded", loadAsync );
	document.addEventListener( "loadAsyncImages", loadAsync );
}());