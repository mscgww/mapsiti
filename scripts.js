const firebaseConfig = {
    apiKey: AIzaSyBe_ZoDUJbHi0n5WJ3m_ynwzTx6Vd7qVUs,
    authDomain: mapsiti.firebaseapp.commapsiti.firebaseapp.com,
    projectId: mapsiti,
    storageBucket: mapsiti.appspot.com,
    messagingSenderId: 664506027514,
    appId: 1:664506027514:web:11fa5ce52e28778c48a843
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the storage service
const storage = firebase.storage();

document.getElementById('fileInput').addEventListener('change', function(event) {
    const files = event.target.files;
    const imageContainer = document.getElementById('imageContainer');
    imageContainer.innerHTML = ''; // Clear the container

    for (const file of files) {
        const storageRef = storage.ref('images/' + file.name);
        const uploadTask = storageRef.put(file);

        uploadTask.on('state_changed', 
            function(snapshot) {
                // Observe state change events such as progress, pause, and resume
            }, 
            function(error) {
                // Handle unsuccessful uploads
                console.error('Upload failed:', error);
            }, 
            function() {
                // Handle successful uploads on complete
                uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                    const img = document.createElement('img');
                    img.src = downloadURL;
                    imageContainer.appendChild(img);
                });
            }
        );
    }
});