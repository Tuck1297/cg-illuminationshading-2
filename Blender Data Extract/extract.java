/*
Directions: 
1) Move .txt file with blender data into same scope of this java file. (Eliminates the need to change folder paths).
2) Open the .txt file and delete all header data making sure to leave no spaces at the top of the file or inbetween 
    data types (Format like rocket.txt file also included in the scope of this program)
3) Run the program
4) The data in the three separate files can then be copied and pasted into the appropriate parts of the Webgl program 
NOTE: If you rerun this program, it will overwrite any files of the same name defined below in the output lines of code. 
NOTE: When extracting .ply file from Blender deselect UV and Vertex Color - Have not been successful yet exporting all data
        while these two are checked. 

*/

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Scanner;

public class extract {

    public static void main(String[] args) {
        Scanner fileGetter;
        String edgesString = "";
        String xyzString = "";
        String normalString = "";
        int counter = 0;
        // Change this file name to the name that you placed in the scope of the program
        File myFile = new File("rocket.txt");
        try {
            fileGetter = new Scanner(myFile);
        } catch (FileNotFoundException e) {
            System.out.println("File not found");
            return;
        }

        while (fileGetter.hasNextLine()) {
            String currentLine = fileGetter.nextLine();
            String parts[] = currentLine.split(" ");
            if (parts.length < 4) {
                // No useful data on this line just skip
            }
            else if (parts.length> 4) {
                // Extracts X, Y, and Z vertices from list
                xyzString = xyzString + parts[0] + "," + parts[1] + "," + parts[2] + "," + "\n";
                // Extracts normal_x, normal_y and normal_z data from list
                normalString = normalString + parts[3] + "," + parts[4] + "," + parts[5] + "," + "\n";
                System.out.println(parts.length);
            } else if (parts.length == 4) {
                // Extracts edge data from list
                edgesString = edgesString + parts[1] + "," + parts[2] + "," + parts[3] + "," + "\n";
            }
            counter++;
        }
        try {
            // After extracting data create three unique files with each containing their specific data
            Files.write(Paths.get("edges.txt"), edgesString.getBytes(StandardCharsets.UTF_8));
            Files.write(Paths.get("xyz_vertices.txt"), xyzString.getBytes(StandardCharsets.UTF_8));
            Files.write(Paths.get("normal.txt"), normalString.getBytes(StandardCharsets.UTF_8));
        } catch (IOException e) {
            System.out.println("Problem writing file");
        }

    }

}
