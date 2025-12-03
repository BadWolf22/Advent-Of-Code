class Program {
    static void Main() {
        Console.WriteLine(Part1("sample.txt"));
        Console.WriteLine(Part1("input.txt"));
        Console.WriteLine(Part2("sample.txt"));
        Console.WriteLine(Part2("input.txt"));
    }

    static int Part1(string fileName) {
        var current = 50;
        var count = 0;

        var input = File.ReadAllLines(fileName);

        foreach (var line in input) {
            var rotation = int.Parse(line.Replace("L", "-").Replace("R",""));
            current = (current + rotation + 100) % 100;
            if (current == 0) {
                count++;
            }
        }

        return count;
    }

    static int Part2(string fileName) {
        var current = 50;
        var count = 0;

        var input = File.ReadAllLines(fileName);

        foreach (var line in input) {
            var dir = line.StartsWith("L") ? -1 : 1;
            var mag = int.Parse(line.Replace("L", "").Replace("R",""));

            while (mag >= 100) {
                mag -= 100;
                count++;
            }
            
            var newPos = current + (dir * mag);
            if (newPos <= 0 && current > 0)
                count++;
            if (newPos >= 100 && current < 100)
                count++;
            
            current = (newPos + 100) % 100;
        }

        return count;
    }
}