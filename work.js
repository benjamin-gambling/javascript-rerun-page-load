// 13th October 2020 - RERUN JAVASCRIPT TO RENDER PAGE - COMPLETE

    // 1. ADD BUTTON WITH ID
    <a id="load-images" href="#" class="w-button">Button Text</a>

    // 2. REFERENCE ID
    const loadImages = document.getElementById("load-images")

    // 3. ADD EVENT LISTENER TO RUN FUNCTION ON CLICK
    loadImages.addEventListener('click', orderedShow)

    // NOTES: - 
        // var observer = new MutationObserver(function(mutations) {
        //     mutations.forEach(function(mutationRecord) {
        //     console.log('style changed!');
        //     });    
        //  });

        // var target = document.getElementById('myId');
        // observer.observe(target, { attributes : true, attributeFilter : ['style'] });

        // loadImages.addEventListener('click', () => {
        //    setTimeout(orderedShow, 2500)
            // });

// 16th October 2020 - FURTHER DEVELOP JS NAVIGATION - IN PROGRESS 
 
    // 1. VIDEO PLAYER 

        // HEAD
        // VIDEO PLAYER LIGHT + MIN, IF WANT TO UPGRADE TO STANDARD REMOVE .light AND/OR .min 
            // <link href="https://unpkg.com/cloudinary-video-player@1.4.3/dist/cld-video-player.light.min.css" rel="stylesheet">
            // <script src="https://unpkg.com/cloudinary-core@2.10.3/cloudinary-core-shrinkwrap.min.js" type="text/javascript"></script>
            // <script src="https://unpkg.com/cloudinary-video-player@1.4.3/dist/cld-video-player.light.min.js" type="text/javascript"></script>

        // TOP OF TRIP SECTION
            // <div id="topscroll" class="cont-video w-container" style="max-width: 1200px; width: 100vw; " >           
            //     <video id="video-player"  muted  class="cld-video-player cld-fluid" style="outline: none;"></video> 
            // </div> 

        // VIDEO PLAYER
        const cld = cloudinary.Cloudinary.new({ cloud_name: 'dtgbbrxs0' });

        //  ADD MULTIPLE VIDEOS w/ OPTIONS TO ADD TITLE + SUBTITLE (ADD + DELETE AS YOU PLEASE) COPY AND EDIT NAME, ID, TITILE (opt)
        const source1 = { publicId: 'finalvid' };
        // const source2 = { publicId: '<enter id here>' };
        
        // THEN ADD  SOURCE TO THIS LIST W/ COMMA SEPARATING EX: [source1, source2, source3];
        const playlistSources = [source1];
        const playlistOptions = {
            autoAdvance: true,
            repeat: true,
        };

        const player = cld.videoPlayer('video-player')

        player.playlist(playlistSources, playlistOptions);

    // 2. DEFERS LOADING TILL END 
        // <script defer src="https://product-gallery.cloudinary.com/all.js" type="text/javascript"></script>  
        // <script async src="https://product-gallery.cloudinary.com/all.js" type="text/javascript"></script>
    

    // 3. Runs Cloudinary loading script to populate Itin-section1 galleries

    SELECT EXPERIENCE BUTTON
    // ADD id="select-experience"
    <a id="select-experience" href="#topscroll" data-w-id="48bb5095-e6b5-ac1b-7608-c334ab10bdcd" class="trip-main_btn w-button">Select experiences</a>

    
    // USER NEXT AND PREVIOUS AS EXAMPLES THESE BUTTONS CAN BE CHANGED JUST NEED IDS "previous-day" & "next-day"
    <nav role="navigation" class="w-nav-menu">
        <a id="previous-day" href="#" class="nav-link w-nav-link">Previous</a>
        <a id="next-day" href="#" class="nav-link w-nav-link">Next</a>
    </nav>

    // 4. Runs Cloudinary loading script to populate Itin-section2 etc galleries

