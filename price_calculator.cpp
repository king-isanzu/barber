// Optional C++ example: calculate a barber service price.
// The website itself uses HTML, CSS and JavaScript; C++ is not run by a browser.
#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    cout << "KING CLASSIC BARBERSHOP - PRICE LIST\n";
    cout << "1. Classic Haircut  : TSh 5000\n";
    cout << "2. Skin Fade        : TSh 7000\n";
    cout << "3. Beard Grooming   : TSh 3000\n";
    cout << "4. Full Grooming    : TSh 10000\n";
    cout << "Choose service (1-4): ";

    int choice;
    cin >> choice;
    int price = 0;
    switch (choice) {
        case 1: price = 5000; break;
        case 2: price = 7000; break;
        case 3: price = 3000; break;
        case 4: price = 10000; break;
        default:
            cout << "Invalid choice. Please choose 1 to 4.\\n";
            return 1;
    }
    cout << "Your selected service costs TSh "
         << price << ". Karibu King Classic Barbershop!\\n";
    return 0;
}
