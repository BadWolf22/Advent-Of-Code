class Program {
    static void Main() {
        Console.WriteLine($"Part1 Sample: {Part1("sample.txt")}");
        Console.WriteLine($"Part1 Input: {Part1("input.txt")}");
        Console.WriteLine($"Part2 Sample: {Part2("sample.txt")}");
        Console.WriteLine($"Part2 Input: {Part2("input.txt")}");
    }

    static int Part1(string fileName) {
        var joltage = 0;

        var banks = File.ReadAllLines(fileName);
        foreach (var bank in banks)
        {
            var firstNum = bank[..^1].MaxBy(x => int.Parse($"{x}"));
            var lastNum = bank[(bank.IndexOf(firstNum) + 1)..].MaxBy(x => int.Parse($"{x}"));
            joltage += int.Parse($"{firstNum}{lastNum}");
        }
        return joltage;
    }

    static double Part2(string fileName) {
        double joltage = 0;
        const int digitsToFind = 12;

        var banks = File.ReadAllLines(fileName);
        foreach (var bank in banks)
        {
            var joltageString = "";
            var lastIndex = -1;
            while (joltageString.Length < digitsToFind)
            {
                var searchRange = bank[(lastIndex + 1)..^(digitsToFind-(1+joltageString.Length))];
                var maxDigit = searchRange.MaxBy(x => int.Parse($"{x}"));
                joltageString += maxDigit;
                lastIndex += searchRange.IndexOf(maxDigit) + 1;
            }
            joltage += double.Parse(joltageString);
        }
        return joltage;
    }
}