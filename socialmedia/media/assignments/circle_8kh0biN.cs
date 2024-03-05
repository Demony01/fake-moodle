using System;
namespace po3
{
    public class Circle
    {
        public void circle(int r)
        {
            double a = 2 * Math.PI * r;
            double c = Math.PI * (r * r);

            Console.WriteLine($"Длина окружности: {a}, Площадь: {c}");
        }
        public void sphere(int r)
        {
            double a = 4 * Math.PI * (r * r);
            double v = (4.0 / 3.0) * Math.PI * (r * r * r);
            Console.WriteLine("Объем: " + v + "Площадь: " + a);
        }
    }
}
