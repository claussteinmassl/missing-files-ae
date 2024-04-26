/* 
This script searches for missing footage and prints them to a text file.

created: 19.04.2023
last modified: 19.04.2023
version: v0.1.0
written by claus steinmassl | www.claus-steinmassl.com
copyright (c) 2023, claus steinmassl

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.


*/


#target aftereffects

// Prompt the user to choose a folder for the output file
var outputFolder = Folder.selectDialog("Choose a folder for the output file");

// If the user cancelled the dialog, exit the script
if (outputFolder == null) {
    alert("No output folder selected.");
    exit();
}

// Define the output file path and name based on the current After Effects project
var outputFilePath = outputFolder.fsName + "/" + app.project.file.name.replace(/\.[^\.]+$/, "") + ".txt";

// Create an empty array to store the list of missing media files
var missingMedia = [];

// Loop through all items in the project
for (var i = 1; i <= app.project.numItems; i++) {
    var item = app.project.item(i);
    
    // Check if the item is a footage item and if it's missing
    if (item instanceof FootageItem) {
        if(item.mainSource.missingFootagePath) {
            missingMedia.push(item.mainSource.missingFootagePath);
        }
    }
}

// Remove duplicate file paths from the array
missingMedia = missingMedia.filter(function(elem, index, self) {
    return index === self.indexOf(elem);
});

// Sort the list of missing media
missingMedia.sort();

// Create a new file object with the output file path
var outputFile = new File(outputFilePath);

// Open the file in write mode
outputFile.open("w");

// Write the missing media list to the file
outputFile.write(missingMedia.join("\n"));

// Close the file
outputFile.close();

// Alert the user that the file has been saved
alert("Missing media file list saved to " + outputFilePath);
