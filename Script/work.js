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
 
    // 1. VIDEO AT TOP OF TRIP SECTION

        // OPTION 1 - VIDEO PLAYER 
        // IN HEAD PlACE THESE LINK FOR VIDEO PLAYER ONLY! IF QUALITY NOT GOOD ENOUGH UPGRADE FROM LIGHT/MIN
        // VIDEO PLAYER LIGHT + MIN, IF WANT TO UPGRADE TO STANDARD REMOVE .light AND/OR .min 
            <link href="https://unpkg.com/cloudinary-video-player@1.4.3/dist/cld-video-player.light.min.css" rel="stylesheet">
            <script src="https://unpkg.com/cloudinary-core@2.10.3/cloudinary-core-shrinkwrap.min.js" type="text/javascript"></script>
            <script src="https://unpkg.com/cloudinary-video-player@1.4.3/dist/cld-video-player.light.min.js" type="text/javascript"></script>

        // TOP OF TRIP SECTION
             <div id="topscroll" class="cont-video w-container" style="max-width: 1200px; width: 100vw; " >           
                 <video id="video-player"  muted  class="cld-video-player cld-fluid" style="outline: none;"></video> 
            </div> 

        // PLACE AT TOP OF SCRIPT
            const video = document.getElementById("video-player").parentElement;
            video.style.width = "100%";

            const cld = cloudinary.Cloudinary.new({ cloud_name: "dtgbbrxs0" });
            const player = cld.videoPlayer("video-player", {
               loop: true,
               autoplayMode: "on-scroll",
             });

           window.screen.width > 475 ? "finalvid" : "chael"


    //OPTION 2 - PRODUCT GALLERY VIDEO 

             //PLACE IN HEAD
            <script
                src="https://product-gallery.cloudinary.com/all.js"
                type="text/javascript">
            </script>

            //ADD DIV FOR VIDEO GALLERY - STYLE IN DIV ABOVE STOPS PAGE MOVING DOWN EFFECT
            <div id="topscroll" class="cont-video w-container" style="width: 100%; min-height: 40vw">
                <div id="video-player"></div>
            </div>

            //PLACE AT TOP OF SCRIPT 
            const videoGallery = cloudinary.galleryWidget({
                container: "#video-player",
                cloudName: "dtgbbrxs0",
                carouselStyle: "none",
                aspectRatio: "16:9",
                mediaAssets: [
                {
                    tag: window.screen.width > 475 ? "desktopvid" : "mobilevid",
                    mediaType: "video",
                },
                ],
            });

            videoGallery.render();


             // 2. ITIN GALLERY 

            //PLACE IN HEAD IF NOT ALREADY THERE 
            <script
                src="https://product-gallery.cloudinary.com/all.js"
                type="text/javascript">
            </script>

            // ADD id="select-experience" TO SELECT EXPERIENCE BUTTON

            <a
              id="select-experience"
              href="#topscroll"
              data-w-id="48bb5095-e6b5-ac1b-7608-c334ab10bdcd"
              class="trip-main_btn w-button"
              >Select experiences</a>

            //CHANGE PREVIOUS SCRIPT TO CATCH ERRORS SO ITIN-SECTION 2 ONWARDS CAN LOAD (added try and catch)

                async function orderedShow() {
                        let containers = document.querySelectorAll("[data-gallery='true']");
                        var galleries = [];
                        for (galleryContainer of containers) {
                            try {
                            galleries.push({
                                gallery: await createGallery(galleryContainer),
                                container: galleryContainer,
                            });
                            } catch (e) {}
                        }
                        for (gallery of galleries) {
                            await updateGallery(gallery.gallery, gallery.container);
                        }
                    }

            // ADD THIS TO BOTTOM OF ORIGINAL SCRIPT 
            // THIS IS THE CORE SCRIPT AND ALL YOU NEED FOR THE GALLERY TO RUN 
            // IT LISTENS TO WHEN THE ITIN SECTION DISPLAY CHANGES TO BLOCK THEN RUNS THE GALLERY SCRIPT
            // IT DOESNT NEED ANY BUTTONS OR ANYTHING TO MAKE IT WORK HOWEVER THESE CAN BE ADDED IF YOU DON'T WANT THIS, HOWEVER I FEEL THIS IS THE MOST FLEXIBLE SO YOU DONT NEED ME TO EDIT YOUR SCRIPT DUE TO LITTLE CHANGES

            // ITIN SECTIONS
            const itinSections = [
                ...document.querySelectorAll('[class^="itin-section"]'),
            ];

            // OBSERVER FUNCTION

            const observeItin = () => {
                let delayExecution = false;
                const config = { attributes: true };
                const callback = (mutationsList, observer) => {
                for (const mutation of mutationsList) {
                    if (!mutation.target.getAttribute("data-loaded")) {
                    if (
                        mutation.target.style.display === "block" &&
                        delayExecution === false
                    ) {
                        delayExecution = true;
                        setTimeout(() => (delayExecution = false), 1500);
                        orderedShow();
                        mutation.target.setAttribute("data-loaded", true);
                    }
                    }
                }
                };
                const observer = new MutationObserver(callback);

                itinSections.forEach((node) => {
                observer.observe(node, config);
                });
            };

            const selectExperienceButton = document.getElementById("select-experience");

            selectExperienceButton.addEventListener("click", () => {
                observeItin();
            });













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

