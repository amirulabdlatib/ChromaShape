# ChromaShape

## Getting Started

Follow these steps to set up ChromaShape on your local machine:

1. **Clone the Repository:**
   - Go to [ChromaShape GitHub Repository](https://github.com/amirulabdlatib/ChromaShape).
   - Under "Code," copy the highlighted text.

     ```bash
     git clone https://github.com/amirulabdlatib/ChromaShape.git
     ```

2. **Create a New Folder:**
   - Create a new folder on your local computer.

3. **Open the Folder with a Code Editor:**
   - Open the newly created folder with your preferred code editor.

4. **Install Virtual Environment:**
   - Open your terminal in the directory of the new folder.
   - Run the following command to install virtualenv:

     ```bash
     pip install virtualenv
     ```

5. **Create and Activate Virtual Environment:**
   - Run the following commands in the terminal:

     ```bash
     virtualenv venv
     venv\Scripts\activate  # For Windows
     source venv/bin/activate  # For MacOS/Linux
     ```

6. **Install Dependencies:**
   - Run the following command to install all required dependencies:

     ```bash
     pip install -r requirements.txt
     ```

7. **Database Migrations:**
   - Run the following commands for database migrations:

     ```bash
     python manage.py makemigrations ChromaShape
     python manage.py migrate
     ```

8. **Run the Application:**
   - Finally, run the following command and open it in your browser:

     ```bash
     python manage.py runserver
     ```

   - The application is usually accessible at `http://127.0.0.1:8000/` in your browser (not necessarily on port 8000).

That's it! You should now have ChromaShape running locally on your machine.
